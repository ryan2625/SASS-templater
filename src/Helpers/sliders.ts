class SliderContainer {
    sliderList: Slider[]

    constructor(sliderList: Slider[]) {
        this.sliderList = sliderList
    }

    create():Slider {
        return new Slider(1, 1, null, null)
    }

    edit() {
        
    }
}

class Slider {
    position: number
    value: number 
    prev: Slider | null
    next: Slider | null

    constructor(position: number, value: number, prev: Slider | null, next: Slider | null ) {
        this.position = position
        this.value = value
        this.prev = prev
        this.next = next
    }
}