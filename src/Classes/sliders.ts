interface sliderInstanceProps {
  prev: null
  id: string
}

class SliderContainer {
  public sliderList: Slider[]
  public len: number
  private body: HTMLDivElement
  private styles: string

  constructor(sliderList: Slider[]) {
    this.sliderList = sliderList
    this.body = document.createElement('div')
    this.styles = ``
    this.len = 0
    //Need to append it to parent div element
  }

  public createAndAddSlider(slider: sliderInstanceProps) {
    let newSlider
    if (this.len > 0) {
      const prevSlider: Slider = this.sliderList[this.len - 1]
      const newSlider = new Slider(prevSlider, slider.id)
      prevSlider.next = newSlider
    } else {
      newSlider = new Slider(null, slider.id)
    }
    this.len += 1
    if (newSlider) {
      this.sliderList.push(newSlider)
    }
  }
}

//Be prepared to use bounding rect's API
//Make CSS class/styles. Absoulte positioning. The value will be the relative X coordinates in pixels.
//Update value function to ensure the position is not greater than the next position. Add event listeners.

class Slider {
  public prev: Slider | null
  public next: Slider | null
  public id: string
  private position: number
  private value: number
  private body: HTMLDivElement
  private styles: string

  constructor(prev: Slider | null, id: string) {
    this.prev = prev
    this.id = id
    this.position = prev?.position ? prev.position + 1 : 1
    this.value = this.position * 10
    this.next = null
    this.body = document.createElement('div')
    this.body.addEventListener('click', () => console.log('Event Working'))
    this.styles = ``
    //Need to append it to parent div element
  }

  moveValue() {}
}

// eslint-disable-next-line
const mainSliderContainer: SliderContainer = new SliderContainer([])
// eslint-disable-next-line
const sliderPropsArr: sliderInstanceProps[] = [{ prev: null, id: '' }]
