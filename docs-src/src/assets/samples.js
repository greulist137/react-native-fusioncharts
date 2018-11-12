var fcDemos = {};

fcDemos['ex1'] = {
  title: 'A simple chart',
  description: 'A simple chart with all data embedded into the directive',
  code:
    'import React, { Component } from "react";\nimport { Platform, StyleSheet, Text, View } from "react-native";\nimport FusionCharts from "react-native-fusioncharts";\n\nexport default class PlainColumn2D extends Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      type: "column2d",\n      width: "100%",\n      height: "100%",\n      dataFormat: "json",\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: "file:///android_asset/fusioncharts.html" },\n      ios: require("./assets/fusioncharts.html")\n    });\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>A Column 2D Chart</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath} // set the libraryPath property\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: "bold",\n    fontSize: 20,\n    textAlign: "center",\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: "#000",\n    borderWidth: 1\n  }\n});\n'
};

fcDemos['ex2'] = {
  title: 'A 3d pie chart',
  description:
    'A 3D pie chart using the datasource attribute from components scope',
  data: `// Setup needed in app.module.ts\n\nimport { NgModule, enableProdMode } from '@angular/core'\nimport { AppComponent } from './app.component';\nimport { BrowserModule } from '@angular/platform-browser';\nimport { FusionChartsModule } from 'angular-fusioncharts';\n\n// Load FusionCharts\nimport * as FusionCharts from 'fusioncharts';\n// Load Charts module\nimport * as Charts from 'fusioncharts/fusioncharts.charts';\n// Load fusion theme\nimport * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';\n\n// Add dependencies to FusionChartsModule\nFusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule,\n    FusionChartsModule\n  ],\n  providers: [\n  ],\n  bootstrap: [ AppComponent ]\n})\nexport class AppModule {\n}\n`,
  code:
    "import React, { Component } from \"react\";\nimport FusionCharts from 'react-native-fusioncharts';\nimport { View, Text, StyleSheet, Platform } from 'react-native';\n\nclass Pie3D extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      type: 'pie3d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    })\n  }\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>A 3D Pie Chart</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath} // set the libraryPath property\n          />\n        </View>\n      </View>\n    )\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 16\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 2\n  }\n});\n\nexport default Pie3D;"
};

fcDemos['ex3'] = {
  title: 'Update chart data',
  description:
    'Change the data dynamically in the component and watch the chart update automatically',
  code:
    "import React, { Component } from 'react';\nimport FusionCharts from 'react-native-fusioncharts';\nimport { View, Text, StyleSheet, Platform, Button, Alert } from 'react-native';\n\nclass UpdateChartData extends Component {\n  constructor(props) {\n    super(props);\n    this.changeData = this.changeData.bind(this);\n    this.state = {\n      type: 'column2d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  changeData() {\n    let dataSource = this.state.dataSource;\n    dataSource.data[2].value = this.getRandomNumber();\n    dataSource.data[3].value = this.getRandomNumber();\n    this.setState({\n      dataSource: dataSource\n    });\n  }\n\n  /*\n  Get a random number from 50 to 300\n  */\n  getRandomNumber() {\n    var max = 300,\n      min = 50;\n    return Math.round((max - min) * Math.random() + min);\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>Update Chart Data</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath} // set the libraryPath property\n          />\n        </View>\n        <View style={styles.buttonContainer}>\n          <Button\n            title=\"Update Chart Data\"\n            onPress={this.changeData.bind(this)}\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 16\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 2\n  },\n  buttonContainer: {\n    alignItems: 'center',\n    padding: 10,\n    marginTop: 10\n  }\n});\n\nexport default UpdateChartData;\n"
};

fcDemos['ex4'] = {
  title: 'Listen to events from chart',
  description:
    'Bind event listener to the chart and get the related event data',
  code:
    "import React, { Component } from 'react';\nimport { Platform, StyleSheet, Text, View, Alert } from 'react-native';\nimport FusionCharts from 'react-native-fusioncharts';\n\nexport default class ListenEvents extends Component {\n  constructor(props) {\n    super(props);\n\n    this.state = {\n      type: 'column2d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>Listen to events from chart</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            events={this.state.events}\n            libraryPath={this.libraryPath} // set the libraryPath property\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 1\n  }\n});\n"
};

fcDemos['ex5'] = {
  title: 'Add drill down to chart',
  description: 'Use LinkedCharts to quickly add drill-down to charts',
  code:
    "import React, { Component } from 'react';\nimport { Platform, StyleSheet, Text, View } from 'react-native';\nimport FusionCharts from 'react-native-fusioncharts';\n\nexport default class DrillDown extends Component {\n  constructor(props) {\n    super(props);\n    this.apiCaller = null;\n    this.state = {\n      type: 'column2d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>A Chart with Drill-Down</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath} // set the libraryPath property\n            onInitialized={caller => {\n              this.apiCaller = caller;\n              this.apiCaller(`window.chartObj.configureLink({\n                type: 'pie2d',\n                overlayButton: {\n                  message: 'Back',\n                  fontColor: '880000',\n                  bgColor: 'FFEEEE',\n                  borderColor: '660000',\n                }}, 0);`);\n            }}\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 1\n  }\n});\n"
};

fcDemos['ex6'] = {
  title: 'A simple gauge',
  description: 'A simple gauge to show customer satisfaction score',
  code:
    "import React, { Component } from 'react';\nimport { Platform, StyleSheet, Text, View } from 'react-native';\nimport FusionCharts from 'react-native-fusioncharts';\n\nexport default class DrillDown extends Component {\n  constructor(props) {\n    super(props);\n    this.apiCaller = null;\n    this.state = {\n      type: 'angulargauge',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>A Simple Gauge</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath}\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 1\n  }\n});\n"
};

fcDemos['ex7'] = {
  title: 'Applying a different theme',
  description: 'Choosing from different themes available in FusionCharts Suite',
  code:
    "import React, { Component } from 'react';\nimport { Platform, StyleSheet, Text, View, Button } from 'react-native';\nimport FusionCharts from 'react-native-fusioncharts';\n\nexport default class ThemeMenu extends Component {\n  constructor(props) {\n    super(props);\n    this.activatedColor = '#8cd46a';\n    this.apiCaller = null;\n\n    this.state = {\n      selectedTheme: 'fusion',\n      btnDisabled: true,\n      type: 'column2d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  changeTheme(theme) {\n    this.setState({\n      selectedTheme: theme\n    })\n    this.apiCaller(`window.chartObj.setChartAttribute('theme', '${theme}')`);\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>Choose from multiple themes</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath}\n            onInitialized={(caller) => {\n              this.setState({ btnDisabled: false });\n              this.apiCaller = caller;\n            }}\n          />\n        </View>\n\n        <View style={styles.buttonContainer}>\n          <Button title=\"Fusion\" disabled={this.state.btnDisabled} onPress={() => this.changeTheme('fusion')} color={this.state.selectedTheme === 'fusion' ? this.activatedColor : 'blue'} />\n          <Button title=\"Fint\" disabled={this.state.btnDisabled} onPress={() => this.changeTheme('fint')} color={this.state.selectedTheme === 'fint' ? this.activatedColor : 'blue'} />\n          <Button title=\"Ocean\" disabled={this.state.btnDisabled} onPress={() => this.changeTheme('ocean')} color={this.state.selectedTheme === 'ocean' ? this.activatedColor : 'blue'} />\n        </View>\n      </View>\n    )\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 1\n  },\n  buttonContainer: {\n    flexDirection: 'row',\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'space-around',\n    padding: 10,\n    marginTop: 10\n  },\n  instruction: {\n    fontSize: 15\n  }\n});"
};

fcDemos['ex8'] = {
  title: 'Change chart type at runtime',
  description: 'Change the chart type dynamically or at runtime',
  code: `import React, { Component } from 'react';\nimport { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';\nimport FusionCharts from 'react-native-fusioncharts';\n\nexport default class ChartRunTime extends Component {\n  constructor(props) {\n    super(props);\n    this.apiCaller = null;\n    this.state = {\n      type: 'column2d',\n      width: '100%',\n      height: '100%',\n      dataFormat: 'json',\n      chartType: '',\n      dataSource: {/* see data tab */}\n    };\n    this.libraryPath = Platform.select({\n      // Specify fusioncharts.html file location\n      android: { uri: 'file:///android_asset/fusioncharts.html' },\n      ios: require('./assets/fusioncharts.html')\n    });\n  }\n\n  changeType(type) {\n    this.setState({ chartType: type }, () => {\n      this.apiCaller(\`window.chartObj.chartType('\${type}')\`);\n    });\n  }\n\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text style={styles.header}>Change chart type at runtime</Text>\n        <View style={styles.chartContainer}>\n          <FusionCharts\n            type={this.state.type}\n            width={this.state.width}\n            height={this.state.height}\n            dataFormat={this.state.dataFormat}\n            dataSource={this.state.dataSource}\n            libraryPath={this.libraryPath} // set the libraryPath property\n            onInitialized={caller => {\n              this.apiCaller = caller;\n              if (this.state.chartType === '')\n                this.setState({ chartType: this.state.type });\n            }}\n          />\n        </View>\n        <Text style={styles.info}>Press button to change chart type</Text>\n        <View style={styles.buttonContainer}>\n          <Button\n            disabled={\n              this.state.chartType === '' || this.state.chartType == 'column2d'\n            }\n            style={{ margin: 8 }}\n            title="Column2D"\n            onPress={() => this.changeType('column2d')}\n          />\n          <Button\n            disabled={\n              this.state.chartType === '' || this.state.chartType == 'pie2d'\n            }\n            title="Pie2D"\n            onPress={() => this.changeType('pie2d')}\n          />\n          <Button\n            disabled={\n              this.state.chartType === '' || this.state.chartType == 'bar2d'\n            }\n            title="Bar2D"\n            onPress={() => this.changeType('bar2d')}\n          />\n        </View>\n      </View>\n    );\n  }\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 10\n  },\n  header: {\n    fontWeight: 'bold',\n    fontSize: 20,\n    textAlign: 'center',\n    paddingBottom: 10\n  },\n  chartContainer: {\n    height: 400,\n    borderColor: '#000',\n    borderWidth: 1\n  },\n  buttonContainer: {\n    padding: 10,\n    display: 'flex',\n    justifyContent: 'space-around',\n    flexDirection: 'row',\n    alignItems: 'center'\n  },\n  info: {\n    fontSize: 16,\n    textAlign: 'center',\n    marginTop: 5\n  }\n});`
};

export default fcDemos;
