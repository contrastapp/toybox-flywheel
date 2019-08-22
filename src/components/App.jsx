import React, { Fragment } from 'react';
import path from 'path';
import _ from 'lodash';
import Box from './Box'
import Text from './Text'
import { remote } from 'electron';
import { TitleBar, Banner, FlyDropdown, Header, Divider, Card, FlySelect, Button, InputPasswordToggle, BigLoader, Switch } from '@getflywheel/local-components';
import styled from 'styled-components';

const Label = styled(Box)`
font-weight: 500;
padding-top: 6px;
padding-bottom: 10px;
`;

const SelectWrapper = styled(Box)`
& .FlySelect__Right .FlySelect__SecondaryText {
 padding-right: 20px;
}
`;


export default class App extends React.Component {
  constructor (props) {
    super(props);

    let projectToken, enabled;
    const context = props.context;
    const projectTokenFile = context.fileSystemJetpack.read(this.projectTokenPath());
    const enabledFile = context.fileSystemJetpack.read(this.enabledPath());

    if (projectTokenFile) {
      const projectJSON = JSON.parse(projectTokenFile);
      projectToken = projectJSON.projectToken
    }

    if (enabledFile) {
      const enabledJSON = JSON.parse(enabledFile);
      enabled = enabledJSON.enabled === 'true'
    }

    this.state = {
      projectToken,
      enabled
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
    return path.join(userDataPath, `${this.props.siteId}-projectToken.json`);
  }

  enabledPath = () => {
    const context = this.props.context;
    const userDataPath = context.environment.userDataPath;
    return path.join(userDataPath, `${this.props.siteId}-enabled.json`);
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
    const projectToken = this.state.tempProjectToken || this.state.projectToken
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
      };
    });
    return projects;
  }

  render () {
    const signIn = (
      <Box>
        <Box maxWidth='350px' pt='30px'>
          <Box pb='30px'>
            <Header fontSize='s'>
              Log in to Toybox
            </Header>
          </Box>
          <div className="FormRow">
            <div className='FormField'>
              <label><Box fontWeight='500'>Email</Box></label>
              <input width='360' onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
          </div>
          <div className="FormRow">
            <div className='FormField'>
              <label>
                <Box flex aic>
                  <Box mr='4' fontWeight='500'>
                    API Key
                  </Box>
                  <Box>
                    <a href='https://app.toyboxsystems.com/settings?api=true' target='_blank'>
                      (Find your key here)
                    </a>
                  </Box>
                </Box>
              </label>
              <InputPasswordToggle onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
          </div>
          <Box pt='10px'>
            <Button onClick={this.signIn} className="__Pill __Green">Log In</Button>
          </Box>
        </Box>
      </Box>
    );

    const showSaveButton = (this.state.tempProjectToken && this.state.tempProjectToken != this.state.projectToken)

    const projectSelect = (
      <Box>
        <Box pb='8'>
          <Header fontSize='14px'>
            Select your Toybox project
          </Header>
        </Box>
        <SelectWrapper>
          <div className="FormRow">
            <div className='FormField'>
              <FlySelect value={this.state.tempProjectToken || this.state.projectToken} style={{ width: '350px' }} options={this.projectOptions()} onChange={(val) => this.setState({ tempProjectToken: val, changedProject: true })} />
            </div>
          </div>
        </SelectWrapper>
        <Box mt='12' >
          <Button disabled={!showSaveButton} onClick={this.setProject} className="xs __Pill __Green">Update</Button>
        </Box>
      </Box>
    );

    const signOut = <Button onClick={this.signOut} className="__GrayOutline">Sign Out From Toybox</Button>;

    const settings = (
      <Box flex aic >
        <Box pr='8' fontWeight='300'>
          {this.props.email}
        </Box>
        <a onClick={this.signOut} style={{textDecoration: 'underline'}}>Log out</a>
      </Box>
    )

    let view = signIn;
    let title = 'Sign into your account';
    const site = this.props.site;
    let description = <p>Don't have a Toybox account? <a target='_blank' href={`https://app.toyboxsystems.com/users/sign_up?flywheel=true&siteName=${site.name}&siteDomain=${site.domain}`}>Create one here for free</a></p>;

    if (this.props.authed) {
      if (this.props.projects.length == 0) {
        view = <Box pt='48px'><BigLoader /></Box>;
      } else {
        description = 'Select a project to start leaving feedback on your site.';
        const project = _.keyBy(this.props.projects, 'hashId')[this.state.projectToken]
        let projectDetails;
        if (project) {
          let title = 'Project';
          projectDetails = (
            <Box>
              <Box pb='20px'>
                <Label>Current tasks: </Label>
                <Header fontSize='s'>
                  {project.taskCount} unresolved
                </Header>
                <Box pt='8'>
                  <Header fontWeight='300' fontSize='xs'>
                    Updated {project.updatedAt}
                  </Header>
                </Box>
              </Box>
              <a href={project.dashboardUrl} target="_blank">
                <Button onClick={_.noop} className="__GrayOutline">Go To Project</Button>
              </a>
            </Box>
          )
        }

        const details =  projectDetails
        view = (
          <Box>
            <Box my='30px' flex between width='100%'>
              <Header fontSize='s'>
                Connect your Local site to Toybox
              </Header>
              <Switch label="Show Toybox on this site" checked={this.state.enabled} tiny={true} name='enabled' onChange={(name, checked) =>  {
                if (checked) {
                  this.setProject()
                } else {
                  this.props.removeScript()
                }
                this.props.context.fileSystemJetpack.write(this.enabledPath(), `{"enabled": "${checked}"}`);
                this.setState({enabled: checked})
              }}/>
          </Box>
          <Box pb='10px'>
            <Divider marginSize="m"/>
          </Box>
          <Box flex>
            <Box borderRight='1px solid' borderColor='gray.15' pr='30px' mr='30px'>
              {this.state.enabled && projectSelect}
            </Box>
            <Box>
              {this.state.enabled && details}
            </Box>
          </Box>
        </Box>
        );
      }
    }


    return (
      <Box>
          <TitleBar title='Toybox'>
              {this.props.authed && settings}
          </TitleBar>
        {
          this.state.error && (
            <Banner variant="error" icon="warning" >
              <strong>Your login credentials were incorrect!</strong> Please check for accuracy and try again.
            </Banner>
          )
        }
        <Box p='30px' pt='0px'>
          {view}
        </Box>
      </Box>
    );

  }

}

