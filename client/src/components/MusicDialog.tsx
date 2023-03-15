import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import './index.css'

import AudioPlayer, { ActiveUI, ProgressUI, VolumeSliderPlacement, PlayListPlacement, PlayerPlacement, InterfaceGridTemplateArea } from 'react-modern-audio-player';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`


const playList = [
  {
    name: '노래제목',
    writer: '가수',
    img: 'https://dl.openseauserdata.com/cache/originImage/files/b42ac3793544ccbc246b4bb65a7515e0.png',
    // src: 'Consolation.mp3',
    src: 'http://localhost:2567/media/Consolation.mp3',
    id: 1,
  },
]
export default function MusicDialog() {
  const [activeUI, setActiveUI] = useState<ActiveUI>({ all: true });
  const [progressType, setProgressType] = useState<ProgressUI>("bar");
  const [theme, setTheme] = useState<"dark" | "light" | undefined>();
  const [width, setWidth] = useState("100%");

  return (
    <Backdrop>
      <Wrapper>
              <AudioPlayer 
                playList={playList}
                activeUI={{
                  // ...activeUI,
                  playButton: true,
                  trackInfo:true,
                  progress: progressType
                }}
                placement={{
                  interface: {
                    templateArea: {
                      trackInfo: "row1-1",
                      progress: "row2-1",
                      playButton: "row1-2",
                    },
                  },
                }}
                rootContainerProps={{
                  colorScheme: theme,
                  width
                }}
              />
              <iframe src="http://localhost:2567/media/Consolation.mp3" frameborder="0"></iframe>
      </Wrapper>
    </Backdrop>
  )
}