import React from 'react';

export default class Page extends React.Component {
    render() {
        return (
            <html>
              <head>
                <title>Mizik Help the people</title>
              </head>
              <body>
                <div id="mount-root"></div>
              </body>
              <script src="main.js"></script>
            </html>
        );
    }
}
