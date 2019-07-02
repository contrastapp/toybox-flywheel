import React from 'react';
import App from './components/App';
// import App from './containers/App';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp';
import { remote } from 'electron';
const formatHomePath = remote.require('./helpers/format-home-path');

import { createStore } from "redux";
import rootReducer from "./reducers/index";
import AppProvider from './components/AppProvider'

export default function (context) {

	const hooks = context.hooks;
	const { Route } = context.ReactRouter;
  let globalSitePath;

  const addToken = (token) => {
    const wpPluginFilename = 'toybox.php';
    const wpPluginPath = path.join( context.electron.remote.process.resourcesPath , wpPluginFilename);

    const sitePath = globalSitePath;
    const muPluginsPath = path.join(sitePath, 'app', 'public','wp-content', 'mu-plugins');
    const pluginFilePath = path.join(muPluginsPath, wpPluginFilename);

    tmp.file({postfix: '.php'}, function (err, path, fd, cleanupCallback) {
      if (err) throw err;

      // fs.writeFileSync(path, `<?php  echo "<script src='http://localhost:3000/js/inject.bundle.js' async data-id='ToyboxSnippet' data-token='${token}'></script>"; ?>`)
      fs.writeFileSync(path, `<?php add_action('wp_head','toybox_installation');function toybox_installation(){if(!is_admin()){echo '<script src="https://d16ahjtmf9d1au.cloudfront.net/inject.bundle.js" async data-id="ToyboxSnippet" data-token="${token}"></script>';}} ?>`)
      fs.copySync(path, pluginFilePath);
    });
  }

  hooks.addContent('routesSiteInfo', (menu) => {
    return (
      <Route notifier={context.notifier} key="site-info-ports" path="/site-info/:siteID/ports"
        render={(props) => {
          return <AppProvider {...props} siteId={menu.routeChildrenProps.site.id} context={context} addToken={addToken}/>
        }}
      />
    )
  });


	hooks.addFilter('siteInfoMoreMenu', function (menu, site) {

    const wpPluginFilename = 'toybox.php';
    const wpPluginPath = path.join( context.electron.remote.process.resourcesPath , wpPluginFilename);

    const sitePath = `${formatHomePath(site.path)}/`;
    const muPluginsPath = path.join(sitePath, 'app', 'public','wp-content', 'mu-plugins');
    const pluginFilePath = path.join(muPluginsPath, wpPluginFilename);

    globalSitePath = sitePath

		menu.push({
			label: 'Toybox',
			enabled: !this.context.router.isActive(`/site-info/${site.id}/ports`),
			click: () => {
				context.events.send('goToRoute', `/site-info/${site.id}/ports`);
			},
		});

		return menu;

	});

}

