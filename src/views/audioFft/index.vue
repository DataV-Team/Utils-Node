<template>
  <div class="audio-fft">
    <div class="tip">Click [audio play] to play music and draw frequency</div>
    <div class="menu">
      <div class="menu-left">
        <div class="btn-group-item">
          <div class="label">audio:</div>
          <button-group :buttons="audioButtonGroupData" :value="audioIndex" @change="handleAudioChange" />
        </div>

        <div class="btn-group-item">
          <div class="label">spring:</div>
          <button-group :buttons="springButtonGroupData" :value="springIndex" @change="handleSpringChange" />
        </div>

        <div class="btn-group-item">
          <div class="label">pick:</div>
          <button-group :buttons="pickButtonGroupData" :value="pickIndex" @change="handlePickChange" />
        </div>

        <div class="btn-group-item">
          <div class="label">symmetry:</div>
          <button-group :buttons="symmetryButtonGroupData" :value="symmetryIndex" @change="handleSymmetryIndexChange" />
        </div>

        <div class="btn-group-item">
          <div class="label">wave:</div>
          <button-group :buttons="waveButtonGroupData" :value="waveIndex" @change="handleWaveIndexChange" />
        </div>

        <div class="btn-group-item">
          <div class="label">colorTransition:</div>
          <button-group :buttons="colorTransitionButtonGroupData" :value="colorTransitionIndex" @change="handleColorTransitionIndexChange" />
        </div>
      </div>
      <div class="menu-right">
        <div class="btn-group-item">
          <div class="label">analyserFFT:</div>
          <input v-model="analyserFFT" @change="update" />
        </div>

        <div class="btn-group-item">
          <div class="label">opacity:</div>
          <input v-model="opacity" @change="update" />
        </div>

        <div class="btn-group-item">
          <div class="label">transitionFrame:</div>
          <input v-model="transitionFrame" @change="update" />
        </div>

        <div class="btn-group-item">
          <div class="label">columnWidth:</div>
          <input v-model="columnWidth" @change="update" />
        </div>

        <div class="btn-group-item">
          <div class="label">columnGap:</div>
          <input v-model="columnGap" @change="update" />
        </div>

        <div class="btn-group-item">
          <div class="label">swingScale:</div>
          <input v-model="swingScale" @change="update" />
        </div>
      </div>
    </div>
    <audio src="/static/mi.mp3" ref="audio-fft-audio" loop />
    <canvas ref="audio-fft-canvas" />
  </div>
</template>

<script>
import AudioFft from '../../../audioFft/index'
import buttonGroup from '../../components/buttonGroup'

export default {
  name: 'AudioFft',
  data () {
    return {
      fft: null,
      // config
      analyserFFT: 2048,
      spring: false,
      wave: false,
      symmetry: false,
      pick: true,
      colorTransition: false,
      colors: ['#6ed4d3', '#f5738f', '#4bb7e4'],
      opacity: 0.5,
      transitionFrame: 300,
      columnGap: 5,
      columnWidth: 5,
      swingScale: 1,

      audioButtonGroupData: [
        'Play',
        'Pause'
      ],
      audioIndex: 1,

      springButtonGroupData: [
        'False',
        'True'
      ],
      springIndex: 0,

      pickButtonGroupData: [
        'False',
        'True'
      ],
      pickIndex: 1,

      symmetryButtonGroupData: [
        'False',
        'True'
      ],
      symmetryIndex: 0,

      waveButtonGroupData: [
        'False',
        'True'
      ],
      waveIndex: 0,

      colorTransitionButtonGroupData: [
        'False',
        'True'
      ],
      colorTransitionIndex: 0
    }
  },
  components: {
    buttonGroup
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const { $refs, getConfig } = this

      const canvas = $refs['audio-fft-canvas']
      const audio = $refs['audio-fft-audio']
      audio.volume = 0.1

      const fft = this.fft = new AudioFft(canvas, getConfig())

      fft.setAudio(audio)
      fft.draw()
    },
    getConfig () {
      const {
        analyserFFT,
        spring,
        wave,
        symmetry,
        pick,
        colorTransition,
        colors,
        opacity,
        transitionFrame,
        columnGap,
        columnWidth,
        swingScale
      } = this

      return {
        analyserFFT: parseInt(analyserFFT),
        spring,
        wave,
        symmetry,
        pick,
        colorTransition,
        colors,
        opacity: parseFloat(opacity),
        transitionFrame: parseInt(transitionFrame),
        columnGap: parseInt(columnGap),
        columnWidth: parseInt(columnWidth),
        swingScale: parseFloat(swingScale)
      }
    },
    update () {
      const { getConfig, fft } = this

      fft.updateConfig(getConfig())
    },
    handleAudioChange (index) {
      const audio = this.$refs['audio-fft-audio']

      if (index === 0) {
        audio.play()
      } else {
        audio.pause()
      }

      this.audioIndex = index
    },
    handleSpringChange (index) {
      this.spring = !!index

      this.springIndex = index

      this.update()
    },
    handlePickChange (index) {
      this.pick = !!index

      this.pickIndex = index

      this.update()
    },
    handleSymmetryIndexChange (index) {
      this.symmetry = !!index

      this.symmetryIndex = index

      this.update()
    },
    handleWaveIndexChange (index) {
      this.wave = !!index

      this.waveIndex = index

      this.update()
    },
    handleColorTransitionIndexChange (index) {
      this.colorTransition = !!index

      this.colorTransitionIndex = index

      this.update()
    }
  }
}
</script>

<style lang="less">
.audio-fft {
  position: relative;
  width: 100%;
  height: 100%;

  canvas {
    position: absolute;
    width: 100%;
    height: 300px;
    box-shadow: 0 0 3px rgba(0, 200, 255, .8);;
    top: 50%;
    transform: translateY(-50%);
  }

  audio {
    position: absolute;
    visibility: hidden;
  }

  .tip {
    text-align: center;
    font-size: 15px;
    line-height: 30px;
    color: #4ba5b6;
  }

  .menu {
    width: 100%;
    display: flex;
    justify-content: center;

    .menu-left, .menu-right {
      width: 350px;
    }

    .btn-group-item {
      display: flex;
      align-items: center;
      margin: 5px 0px;
    }

    .label {
      width: 120px;
      text-align: right;
      margin-right: 10px;
      color: #4ba5b6;
    }

    input {
      outline: none;
      height: 30px;
    }
  }
}
</style>
