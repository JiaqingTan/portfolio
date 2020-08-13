
import './styles.css'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useState, useRef, Fragment, useCallback, useEffect} from 'react'
import { extend, Canvas, useFrame } from 'react-three-fiber'
import Effects from './components/Effects'
import StateContextProvider from './components/StateContext'
import Content from './components/Content'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Rating from 'react-rating';

// Tabs
class Tabs extends React.Component{
  state ={
    activeTab: this.props.children[0].props.label
  }
  changeTab = (tab) => {

    this.setState({ activeTab: tab });
  };
  render(){
    
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, child =>{
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab) content = child.props.children
        })}
         
        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
        <div className="tab-content">{content}</div>
        
      </div>
    );
  }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  const numCategories = buttons.length;

  return(
    <div className="CategoryTabs">
    {buttons.map((button, i) =>
    {
      if(i+1 === numCategories)
      {
        //Last one
        return <h2 className={button === activeTab? 'ActiveTabs': 'Tabs'} onClick={()=>changeTab(button)}>{button}</h2>
      }  
      else
      {
        return (
          <Fragment>
          <h2 className={button === activeTab? 'ActiveTabs': 'Tabs'} onClick={()=>changeTab(button)}>{button}</h2>
          <h2 className="TabDivider">|</h2>
          </Fragment> 
          )
      }
    }
    )
    }
    </div>
  )
}

const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

var clock = new THREE.Clock();
var speed = 0.25; //units a second
var zMaxMovement = 0.3;

function Scene() {
  let group = useRef()
  let theta = 0
  // Hook into the render loop and rotate the scene a bit
  useFrame(() => group.current.rotation.set(0, 5 * Math.sin(THREE.Math.degToRad((theta += 0.02))), 0))
  return <group ref={group} />
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.0025))
  useFrame(() => mesh.current.position.z = props.origZ + (Math.sin(props.startOffset + (speed * clock.getElapsedTime()))) * zMaxMovement)

  return (
    <mesh
      {...props}
      ref={mesh}
      >
      <boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial attach="material" color={props.meshColor}/>
    </mesh>
  )
}



function App() {
  const contentDom = useRef(null)

  //Random number generator
  var rn = require('random-number');
  var startingOffset = rn.generator({
    min: 0.0,
    max: 3.14,
  })

  const getConfigurableProps = () => ({
    showIndicators: true,
    showThumbs: false,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    infiniteLoop: true,
    showStatus: false
  });

  const legendDarkOverlay = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }

  return (
    <Fragment>
      <main style={{ position: 'absolute', overflow: 'auto', top: '0px', width: '100%', height: '101vh' }}>
        <div id="mainContent" ref={contentDom} />
      </main>
      <Canvas style={{ background: '#1E1D1E' }} camera={{ position: [0, -4, 0], fov: 35 }}>
        <Scene /> 
        <pointLight position={[2.5, -3, 1.5]}/>
        <Box position={[-10, 15, 5]} origZ={5} rotation={[-1, -1, -1]} meshColor={'#5e8d9f'} startOffset={startingOffset()}/>
        <Box position={[10, 15, -5]} origZ={-5} rotation={[0, -1, 1]} meshColor={'#5e8d9f'} startOffset={startingOffset()}/>
        <Box position={[-2, 15, -3]} origZ={-3} rotation={[-2, 0, -1]} meshColor={'#ff392e'} startOffset={startingOffset()}/>
        <Box position={[-7, 15, -2]} origZ={-2} rotation={[0, 0, 0]} meshColor={'#1F7D1F'} startOffset={startingOffset()}/>
        <Box position={[2, 15, 5]} origZ={5} rotation={[0, 1, 2]} meshColor={'#1F7D1F'} startOffset={startingOffset()}/>
        <Box position={[9, 15, 3]} origZ={3} rotation={[-1, 0, 1]} meshColor={'#1F7D1F'} startOffset={startingOffset()}/>
        <Box position={[4, 15, 0]} origZ={0} rotation={[1, 1, 2]} meshColor={'#ff392e'} startOffset={startingOffset()}/>
        <Box position={[-3, 15, 2]} origZ={2}rotation={[1, -2, 1]} meshColor={'#ff392e'} startOffset={startingOffset()}/>
        <Effects />

        <StateContextProvider>
          <Content portal={contentDom}>
            <img className="ProfileImage" src="img/profile.jpg"></img>
            <h1 className="Name">TAN JIAQING</h1>
            <h2 className="Title">Software Engineer | Game Developer</h2>
            <Tabs>
              <Tab label="Work Experience">
                <div className="MainContainer">
                  <h3 className="Year">2019</h3>
                  <div className="EntryContainer">
                    <img className="SquareLogo" src="img/WSCSports.png"/>
                    <h3 className="EntryHeaderBold">Backend Developer Intern<br></br>WSC Sports</h3>
                    <h3 className="EntryHeader">July 2019 - December 2019<br></br>Giv'atayim, Israel</h3>
                    <p className="EntryDescription">
                      Worked as part of pilot project to develop environmental foundation in C# for Business Intelligence efforts, utilizing RESTful APIs and .Net Framework, and to create meaningful reports in Microsoft PowerBI using manipulated data.
                      <br/>
                      <br/>
                      Wrote C# functions/programs to:
                      <br/>
                        • Retrieve data through external RESTful APIs (e.g. Social Media)
                        <br/>
                        • Manipulate data to calculate and obtain tangible values
                        <br/>
                        • Write manipulated data to Microsoft Kusto database tables
                        <br/>
                        • Retrieve manipulated data from database via RESTful APIs endpoints using Azure Web Service
                        <br/>
                        • Send daily Slack alerts to Company's Slack channel to inform manager of Customer Relations of changes in calculated "Risk Levels"
                      <br/>
                      <br/>
                      Assisted in:
                      <br/>
                        • Deployment of C# Program (Executable) to Azure Virtual Machine to automate running of functions on a daily basis
                        <br/>
                        • Deployment of Azure Web Service to host RESTful API endpoints
                        <br/>
                      <br/>
                      Created the following reports using Microsoft PowerBI and deployed RESTful API endpoints:
                      <br/>
                        • Social Media Followers Report - Retrieve and display current day's follower count of company's various social media platforms, compare values from previous week/month/year to track trends.
                        <br/>
                        • Risk Report - Retrieve and display "Risk Levels" of each customer daily, according to predefined metrics
                        <br/>
                        • Social Exposure Report - Retrieve and display charts on daily visitor counts to company's various social media platforms
                        <br/>
                        • AM Tool - Retrieve and display all metrics across all customer (Risk statuses, upcoming contract renewals, number of games per week, etc.), to individual metrics per customer (Customer daily usage count of company's system, customer's next contract renewal date, etc.)
                        <br/>
                      <br/>
                      Others:
                        <br/>
                        • Created C# Unit Tests for testing functions
                        <br/>
                        • Created custom emojis for daily Slack alerts in Adobe Photoshop
                        <br/>
                        • Other Technologies Used: LINQ, MSSQL, Microsoft Kusto
                        <br/>
                    </p>
                    <div className="EntryDescriptionCarousel">
                    <Carousel {...getConfigurableProps()} className="CarouselBackground">
                      <div>
                          <img src="img/WSCSports_SocialMediaFollowersReport.png" />
                          <p className="legend" style={legendDarkOverlay}>Social Media Followers Report</p>
                      </div>
                      <div>
                          <img style={{height: '80vh', width: 'auto'}} src="img/WSCSports_RiskReport.png" />
                          <p className="legend" style={legendDarkOverlay}>Risk Report</p>
                      </div>
                      <div>
                          <img src="img/WSCSports_SlackAlerts.png" />
                          <p className="legend" style={legendDarkOverlay}>Slack Alerts (w/ Custom Emojis)</p>
                      </div>
                      <div>
                          <img src="img/WSCSports_SocialExposureReport.png" />
                          <p className="legend" style={legendDarkOverlay}>Social Exposure Report</p>
                      </div>
                      <div>
                          <img style={{height: '80vh', width: 'auto'}} src="img/WSCSports_AMTool.png" />
                          <p className="legend" style={legendDarkOverlay}>AM Tool (UI Mockup)</p>
                      </div>
                  </Carousel>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab label="Projects">
                <div className="MainContainer">
                    <h3 className="Year">2019</h3>
                    <div className="EntryContainer">
                      <img className="SquareLogo" src="img/UnrealLogo.png"/>
                      <h3 className="EntryHeaderBold">Underwater Defense Squad: This Sucks!</h3>
                      <h3 className="EntryHeader">Game Development Project (CS3247)<br></br>National University of Singapore (NUS)</h3>
                      <p className="EntryDescription">
                        Set underwater, "Underwater Defense Squad: This Sucks!" is a third-person co-op "base-defense" action game made using the Unreal Engine 4, where players have to defend their base against evil trash monsters by sucking them up from the ocean! As part of group of six, my responsibilities included enemy gameplay designs and AI behavior implementation, simple enemy bobbing animations, level/wave balancing, and concept level designing.
                      </p>
                      <a className="EntryDescriptionLink" href="https://drive.google.com/file/d/1DZ9HQV5kClQYi48zJS4qQFjkNN6l4427/view?usp=sharing">Download the game here!</a>
                      <div className="EntryDescriptionCarousel">
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/udsts1.png" />
                          </div>
                          <div>
                            <img src="img/udsts2.png" />
                          </div>
                          <div>
                            <img src="img/udsts3.png" />
                          </div>
                          <div>
                            <img src="img/udsts4.png" />
                          </div>
                          <div>
                            <iFrame width="100%" height="540" src="https://www.youtube.com/embed/Mlugx7lR_S8?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iFrame>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                    <div className="EntryContainer">
                      <img className="SquareLogo" src="img/UnityLogo.png"/>
                      <h3 className="EntryHeaderBold">Project Slap</h3>
                      <h3 className="EntryHeader">Hack & Roll 2019 (Hackathon)<br></br>National University of Singapore (NUS)</h3>
                      <p className="EntryDescription">
                      The idea behind "Project SLAP" was our view on the lack of arcade-style, fast-firing series of minigames on smartphones. As part of a duo, "Project SLAP" was created using the Unity Game Engine for the Android platform in 24 hours. My responsibilities included the full design of a single mini-game (Platform Jump), from the 2D art elements to the game logic programming.
                      </p>
                      <a className="EntryDescriptionLink" href="https://drive.google.com/open?id=1CDNcZ7kklUZSPuUC1WMnW5JyJvtnQLga">Download the APK here!</a>
                      <div className="EntryDescriptionCarousel" style={{background: 'rgba(0, 0, 0, 0.25)', marginTop: '1vh'}}>
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/projectSlap1.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                          <div>
                            <img src="img/projectSlap2.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                    <h3 className="Year">2018</h3>
                    <div className="EntryContainer">
                    <img className="SquareLogo" src="img/UnityLogo.png"/>
                      <h3 className="EntryHeaderBold">GoKartYourself</h3>
                      <h3 className="EntryHeader">Orbital (CP2106) Project<br></br>National University of Singapore (NUS)</h3>                
                      <p className="EntryDescription">
                      Using this chance to experiment with networking in Unity, "GoKartYorself" was our first attempt at a multiplayer mobile kart-racing game. As part of a duo, my responsibilities included the map design, modelling of basic environmental props using Maya and Blender, overall graphics and art style, and the programming of race logic, including a checkpoint and positioning system.
                      </p>
                      <div className="EntryDescriptionCarousel">
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/gokartyourself1.png" />
                          </div>
                          <div>
                            <img src="img/gokartyourself2.png"/>
                          </div>
                          <div>
                            <img src="img/gokartyourself3.png" />
                          </div>
                          <div>
                            <img src="img/gokartyourself4.png"/>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                    <div className="EntryContainer">
                      <img className="SquareLogo" src="img/QuestionMarkLogo.png"/>
                      <h3 className="EntryHeaderBold">Concierge</h3>
                      <h3 className="EntryHeader">Software Engineering (CS2103) Project<br></br>National University of Singapore (NUS)</h3> 
                      <p className="EntryDescription">
                      As part of a group of five, we morphed an exiting JavaFX "AddressBook"-style application into a CLI-based Hotel Management System, working with a 12kLoC code base, with multiple releases and forking workflow. My responsibilities included UI modifications and feature modifications, such as the listing and filtering features, and the creation of the application logo.
                      </p>
                      <div className="EntryDescriptionCarousel">
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/conciergeLogo.png" style={{background: 'white'}}/>
                          </div>
                          <div>
                            <img src="img/conciergeUi.png"/>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                    <h3 className="Year">2015</h3>
                    <div className="EntryContainer">
                    <img className="SquareLogo" src="img/QuestionMarkLogo.png"/>
                      <h3 className="EntryHeaderBold">"Unannounced Fatshark Studios Project"</h3>
                      <h3 className="EntryHeader">Major Project - Stingray Engine<br></br>Temasek Polytechnic</h3>
                      <p className="EntryDescription">
                        Having had the opportunity to work with FatShark Studio (Warhammer: Vermintide 2) on an unannounced project using the Autodesk Stingray Engine (discontinued Nov 2018) in Lua, I was responsible for a small part of the project, which was to implement the minimap UI functionality, including rotation of minimap and the displaying of enemy icons based on the player's facing direction.
                      </p>
                    </div>
                    <h3 className="Year">2014</h3>
                    <div className="EntryContainer">
                    <img className="SquareLogo" src="img/UnityLogo.png"/>
                      <h3 className="EntryHeaderBold">Don't Get Crushed!</h3>
                      <h3 className="EntryHeader">Overseas Internship - Okinawa, Japan<br></br>Temasek Polytechnic</h3>
                      <p className="EntryDescription">
                        Attached to the Okinawa National College of Technology, and mobile games studio Applica Labs during an overseas internship, we were given 2.5 months to create and self-publish a mobile game individually, using the Unity Game Engine. As the sole creator, I was responsible in creating all elements of the game, from 2D character and UI design, drawings, and animation, to game logic programming and sound and music design. Right before returning to Singapore, my game was published on the Google Play Store.
                      </p>
                      <a className="EntryDescriptionLink" href="https://play.google.com/store/apps/details?id=com.MMStudios.DontGetCrushed">Download on the Google Play Store!</a>
                      <div className="EntryDescriptionCarousel" style={{background: 'rgba(0, 0, 0, 0.25)', marginTop: '1vh'}}>
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/DontGetCrushed1.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                          <div>
                            <img src="img/DontGetCrushed2.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                          <div>
                            <img src="img/DontGetCrushed3.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                          <div>
                            <img src="img/DontGetCrushed4.png" style={{height: "540px", width: 'auto'}}/>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                    <div className="EntryContainer">
                    <img className="SquareLogo" src="img/UnityLogo.png"/>
                      <h3 className="EntryHeaderBold">Mindworks</h3>
                      <h3 className="EntryHeader">Side Project<br></br>Temasek Polytechnic</h3>
                      <p className="EntryDescription">
                      In collaboration with renowned neuroscientist Professor Ryuta Kawashima, from Tohoku University (Japan), "Mindworks" was a "Brain Age" style game designed to tackle the issue of Dementia in older adults. My groupmates and I were the first batch to work on this project, before passing it down to our juniors for further work after graduation. As part of the original team, I was responsible for the game logic programming of 2-3 minigames. The game has been released in the Google Play Store under the school's name in 2017.
                      </p>
                      <a className="EntryDescriptionLink" href="https://play.google.com/store/apps/details?id=com.TP.Mindworks&hl=en">Download on the Google Play Store!</a>
                      <div className="EntryDescriptionCarousel">
                        <Carousel {...getConfigurableProps()} className="CarouselBackground">
                          <div>
                            <img src="img/mindworks1.png" />
                          </div>
                          <div>
                            <img src="img/mindworks2.png"/>
                          </div>
                          <div>
                            <img src="img/mindworks3.png"/>
                          </div>
                          <div>
                            <img src="img/mindworks4.png"/>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                </div>
              </Tab>
              <Tab label="Skills and Others">
                <div className="MainContainer">
                  <div className="SkillsContainer">
                    <h3 className="ProgLangHeader">Programming Languages</h3>
                    <div className="ProgLangContainer">
                      <p className="SkillsDescription">C#</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={4} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Java</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={2} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">C/C++</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={2} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Python</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={1} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Javascript</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={1} readonly style={{fontSize: '14px'}}/>
                    </div>
                    <h3 className="FrameworkHeader">Frameworks/Libraries/APIs</h3>
                    <div className="FrameworkContainer">
                      <p className="SkillsDescription">.NET Framework</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={4} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">ReactJS</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={2} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Three.js</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={2} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">OpenGL</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={2} readonly style={{fontSize: '14px'}}/>
                    </div>
                    <h3 className="DataVisualizationHeader">Data Visualization Tools</h3>
                    <div className="DataVisualizationContainer">
                      <p className="SkillsDescription">Microsoft PowerBI (DAX)</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={3} readonly style={{fontSize: '14px'}}/>
                    </div>
                    <h3 className="DatabaseHeader">Databases</h3>
                    <div className="DatabaseContainer">
                      <p className="SkillsDescription">Microsoft SQL Server (MSSQL)</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={1} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Microsoft Kusto (Kusto Query Language)</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={1} readonly style={{fontSize: '14px'}}/>
                    </div>
                    <h3 className="GameEnginesHeader">Game Engines</h3>
                    <div className="GameEnginesContainer">
                      <p className="SkillsDescription">Unity Game Engine</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={4} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Unreal Engine</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={3} readonly style={{fontSize: '14px'}}/>
                    </div>
                    <h3 className="MultimediaHeader">Multimedia</h3>
                    <div className="MultimediaContainer">
                      <p className="SkillsDescription">Adobe Photoshop</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={3} readonly style={{fontSize: '14px'}}/>
                      <p className="SkillsDescription">Adobe Illustrator</p>
                      <Rating emptySymbol="fa fa-star-o fa-2x FadeOpacity" fullSymbol="fa fa-star fa-2x" initialRating={1} readonly style={{fontSize: '14px'}}/>
                    </div>
                  </div>
                  <div className="OthersContainer">
                    <h3 className="OthersHeader">Certificates</h3>
                    <p className="OthersDescription">• MERN Stack Front To Back: Full Stack React, Redux & Node.js - Udemy</p>
                  </div>
                 
                </div>
              </Tab>
            </Tabs>
          </Content>
        </StateContextProvider>
      </Canvas>
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
