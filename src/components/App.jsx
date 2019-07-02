import React, { Fragment } from 'react';
import path from 'path';
import _ from 'lodash';
import Box from './Box'
import Text from './Text'
import { remote } from 'electron';
import { Header, Divider, Card, FlySelect, Button, InputPasswordToggle, BigLoader, Switch } from '@getflywheel/local-components';
import confirm from 'local/renderer/confirm';

const { dialog } = remote;

export default class App extends React.Component {
	constructor (props) {
		super(props);

    let projectToken;
		const context = props.context;
		const projectTokenFile = context.fileSystemJetpack.read(this.projectTokenPath());
		if (projectTokenFile) {
			const projectJSON = JSON.parse(projectTokenFile);
      projectToken = projectJSON.projectToken
		}


		this.state = {
      projectToken
		};

	}

	componentWillMount () {
		const context = this.props.context;
		const authFile = context.fileSystemJetpack.read(this.authPath());
		if (authFile) {
			const authJSON = JSON.parse(authFile);
			this.props.actions.addAuth(authJSON);
			this.loadProjects();
		}
	}

  loadProjects = () => {
  	this.props.actions.getProjects();
  }

  authPath = () => {
  	const context = this.props.context;
  	const userDataPath = context.environment.userDataPath;
  	return path.join(userDataPath, 'auth.json');
  }

  projectTokenPath = () => {
  	const context = this.props.context;
  	const userDataPath = context.environment.userDataPath;
    console.log(this.props.siteId)
  	return path.join(userDataPath, `${this.props.siteId}-projectToken.json`);
  }

  signIn = () => {
  	const context = this.props.context;
    this.setState({error: false})
  	this.props.actions.signIn(this.state.email, this.state.password).then((data) => {
      if (data) {
        context.fileSystemJetpack.write(this.authPath(), `{"email": "${this.state.email}", "token": "${data.token}"}`);
        this.loadProjects();
      } else {
        this.setState({error: true})
      }
  	});
  }

  signOut = () => {
  	const context = this.props.context;
  	context.fileSystemJetpack.remove(this.authPath());
  	this.props.actions.signOut();
  }

  setProject = () => {
  	const context = this.props.context;
    console.log(context)
    const projectToken = this.state.tempProjectToken
    this.setState({projectToken})
    this.props.addToken(projectToken)
    context.fileSystemJetpack.write(this.projectTokenPath(), `{"projectToken": "${projectToken}"}`);
  }

  projectOptions = () => {
  	const projects = {};
  	_.each(this.props.projects, (project) => {
  		projects[project.hashId] = {
  			label: project.name,
  			secondaryText: project.companyName,
  			// icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 13h10a1 1 0 1 0 0-2H13V1a1 1 0 0 0-2 0v10H1a1 1 0 1 0 0 2h10v10a1 1 0 1 0 2 0z"></path></svg>,
  		};
  	});
  	return projects;
  }

  render () {
    const signIn = (
      <div>
      <div className="FormRow">
        <div className='FormField'>
          <label>Email</label>
          <input onChange={(e) => this.setState({ email: e.target.value })} />
        </div>
      </div>
      <div className="FormRow">
      <div className='FormField'>
          <label>API Token <a href='https://app.toyboxsystems.com/settings?api=true' target='_blank'><img src="https://img.icons8.com/ios-glyphs/30/000000/external-link.png" height="16px" width="16px" /></a></label>
          <InputPasswordToggle onChange={(e) => this.setState({ password: e.target.value })} />
        </div>
      </div>
        <Box pt='12'>
          <Button onClick={this.signIn} className="__Pill __Green">Sign In</Button>
        </Box>
        {
          this.state.error && <Text warning>Error logging in</Text>
        }
      </div>
    );

    const showSaveButton = (this.state.tempProjectToken && this.state.tempProjectToken != this.state.projectToken)

  	const projectSelect = (
      <Box flex aic my='12'>
        <Box>
          <FlySelect value={this.state.tempProjectToken || this.state.projectToken} style={{ width: '350px' }} options={this.projectOptions()} onChange={(val) => this.setState({ tempProjectToken: val, changedProject: true })} />
        </Box>
        <Box pl='12' style={{visibility: showSaveButton ? 'visible' : 'hidden'}}>
          <Button onClick={this.setProject} className="sm __Pill __Green">Save Settings</Button>
        </Box>
      </Box>
    );

  	const signOut = <Button onClick={this.signOut} className="__GrayOutline">Sign Out From Toybox</Button>;

  	let view = signIn;
    let title = 'Configure Toybox';
    let description = <p>Sign in with your Toybox account or <a target='_blank' href='https://app.toyboxsystems.com?flywheel'>create one for free</a></p>;

  	// <div>
  	//   {this.props.emai}
  	//   <Divider />
  	//   {this.props.project}
  	// <Switch onChange={() => console.log('onChange')}/>
  	// </div>

  	if (this.props.authed) {
  		if (this.props.projects.length == 0) {
  			view = <BigLoader />;
  		} else {
  			description = 'Link a project to start leaving feedback:';
        const project = _.keyBy(this.props.projects, 'hashId')[this.state.projectToken]
        let projectDetails;
        if (project) {
          let title = 'Project';
          projectDetails = (
            <Box>
              <Box flex aic pb='8'>
                <Box>
                  Project: {project.name}
                </Box>
                <Box pl='4'>
                  [{project.companyName}]
                </Box>
              </Box>
              <Box pb='8'>
                Last Updated: {project.updatedAt}
              </Box>
              <Box pb='8'>
                # of Tasks: {project.taskCount}
              </Box>
            </Box>
          )
        }
        view = (
  				<div>
  					<div>
  						{projectSelect}
              {projectDetails}
  					</div>
  					<div style={{ marginLeft: 'auto' }}>
              <Box pt='48'>
                {signOut}
              </Box>
  					</div>
  				</div>
  			);
  		}
  	}


  	return (
  		<div style={{ padding: 12, flex: '1', overflowY: 'auto' }}>
  			<Card
          contentTitle={title}
          contentDescription={description}
  				footer={(
  					<Fragment>
  						{view}
  					</Fragment>
  				)}
  			/>
  		</div>
  	);

  }

}

