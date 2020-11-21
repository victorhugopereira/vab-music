import React, { useState } from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronIcon } from '../components/icons/Chevron';
import { MoreVertIcon } from '../components/icons/MoreVert';
import { PlayIcon } from '../components/icons/Play';

const Background = ({ children }) => {
    return (
        <LinearGradient
            colors={['#292929', '#4e4e4e']}
            style={{
                flex: 1,
                paddingTop: 50,
            }}>
            {children}
        </LinearGradient>
    );
};
//============================ sounds ==============================

  

//===================================================================

const TopBar = styled.View`
    flex-direction: row;
`;

TopBar.Left = styled.View`
    flex: 1;
    padding-left: 16px;
`;

TopBar.Middle = styled.View`
    flex: 2;
    align-items: center;

`;

TopBar.Right = styled.View`
    flex: 1;
    padding-right:16px;
    align-items: flex-end;
`;

TopBar.Title = styled.Text`
    color:white;
    text-transform: uppercase;
`;

TopBar.SubTitle = styled.Text`
    color: white;
    font-weight: bold;
`;

// ============= SCREEN =====================


const ScreenArea = styled.View`
    flex:1;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom:32px;

`;

const CoverArea = styled.View`
    flex:4;
`;

CoverArea.Imagem = styled.Image`
    width:100%;
    flex:1;
`;

const PlayerArea = styled.View`
    flex:2;
    justify-content: flex-end;
`;

PlayerArea.Title = styled.Text`
    color:white;
    font-size: 24px;
`;

PlayerArea.Author = styled.Text`
    color:#BBBBBB;
    font-size: 16px;
`;

//=================CONTROLS===================

const Controls = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

Controls.Play = styled.TouchableOpacity`
`;

Controls.Slider = styled.View`
    flex-basis:100%;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

Controls.Slider.CurrentTime = styled.Text`
    color: #bbbbbb;
`;

Controls.Slider.TotalTime = styled.Text`
    color: #bbbbbb;
`;

const AudioSlider = styled(Slider)`
    flex-basis:100%;
`;

export function PlayerScreen() {
    const [segundos, setSegundos] = useState(0);

    return (
        <Background>


            <TopBar>
                <TopBar.Left>
                    <ChevronIcon />
                </TopBar.Left>

                <TopBar.Middle>
                    <TopBar.Title>
                        Playlist
                </TopBar.Title>
                    <TopBar.SubTitle>
                        Darke
                </TopBar.SubTitle>
                </TopBar.Middle>

                <TopBar.Right>
                    <MoreVertIcon />
                </TopBar.Right>
            </TopBar>

            <ScreenArea>
                <CoverArea>
                    <CoverArea.Imagem
                        resizeMode="contain"
                        source={{
                            uri: "https://placehold.it/750x750",
                        }} />
                </CoverArea>

                <PlayerArea>

                    <PlayerArea.Title>
                        Gorillaz
                    </PlayerArea.Title>

                    <PlayerArea.Author>
                        DARE
                    </PlayerArea.Author>

                    <Controls>

                        <Controls.Slider>

                            <AudioSlider
                                minimumValue={0}
                                maximumValue={100}
                                thumbTintColor="#FFFFFF"
                                maximumTrackTintColor="#777777"
                                minimumrackTintColor="#1DD65F"
                                value={segundos}
                                onValueChange={(value) => {
                                    setSegundos(value);
                                }}
                            />
                            <Controls.Slider.CurrentTime>
                                {segundos}
                            </Controls.Slider.CurrentTime>

                            <Controls.Slider.TotalTime>
                                57:07
                            </Controls.Slider.TotalTime>

                        </Controls.Slider>

                        <Controls.Play>
                                
                            <PlayIcon
                                width={98}
                                height={98} />
                        </Controls.Play>
                    </Controls>
                </PlayerArea>
            </ScreenArea>

        </Background>
    );
}