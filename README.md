## LiskC64 - Lisk Commodore 64 Emulator ##

This is a little tool for Lisk with a C64 like interface.

### Building ###

1. [Install Node.js](https://nodejs.org/download/).

2. Cd into the project directory and run `npm install` to install the proper Grunt version and dependencies for this project.

3. `npm start` to start the software. It will be available at http://localhost:4375. Use `DEBUG=* npm start` to see debug logs.

### Run with PM2 ###

Starting
<pre>
pm2 start app.json --watch
</pre>

Checking logs
<pre>
pm2 logs lisk-c64
</pre>

Stopping
<pre>
pm2 stop lisk-c64
</pre>

## Generating a startup script

Let pm2 detect available init system, generate configuration and enable startup system:

<pre>
pm2 startup
</pre>

Now follow the instruction. For example on ubuntu 14.04 LTE (with systemd as default init system) :

<pre>
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u [user] --hp /home/[user]
</pre>

Copy-paste the last command. Now, *if you didn't before*, run the application with ```pm2 start app.json --watch``` and then:
<pre>
pm2 save
</pre>

This last command will save the process list and execute them on reboot.

If you want to remove the init script, execute:
<pre>
pm2 unstartup [initsystem]
</pre>

For more information:  [Official PM2 Startup Script page](http://pm2.keymetrics.io/docs/usage/startup/#generating-a-startup-script)

### APIs and Libraries ###

LiskC64 uses these libraries:

* [dpos-api-wrapper](https://www.npmjs.com/package/dpos-api-wrapper) by Lisk delegate Vekexasia

LiskC64 uses these APIs:

* [Lisk.Support API](https://lisk.support/lisk-support/lisk-support-public-api/) For Pendings and Group information
* [Lisk API](https://www.bitstamp.net/) Web API (For Price Ticker USD/BTC)

### License ###

If you distribute this project in part or in full, please attribute with a link to [the GitHub page](https://github.com/hirishh/lisk-c64). This software is available under the MIT License, details in the included `LICENSE.md` file.
