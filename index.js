import {Navigation} from 'react-native-navigation';
import App from './App';
// import textDetector from './src/screen/textDetector';

Navigation.registerComponent('Home', () => App);
// Navigation.registerComponent('textDetector', () => textDetector);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a',
    },
    topBar: {
      title: {
        text: 'Research 2022',
        color: 'white',
      },
      backButton: {
        color: 'black',
      },
      background: {
        color: '#4d089a',
      },
    },
    bottomTab: {
      selectedTextColor: 'red',
    },
  });

  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                    options: {
                      topBar: {
                        title: {
                          text: 'Text Recognition',
                        },
                      },
                      bottomTab: {
                        text: 'Text Recognition',
                      },
                    },
                  },
                },
              ],
            },
          },
          // {
          //   stack: {
          //     children: [
          //       {
          //         component: {
          //           name: 'textDetector',
          //           options: {
          //             topBar: {
          //               title: {
          //                 text: 'Text Detector',
          //               },
          //             },
          //             bottomTab: {
          //               text: 'Text Detector',
          //             },
          //           },
          //         },
          //       },
          //     ],
          //   },
          // },
        ],
      },
    },
  });
});
