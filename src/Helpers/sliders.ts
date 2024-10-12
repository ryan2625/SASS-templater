class SliderContainer {
    constructor() {

    }

    create():Slider {
        return new Slider(1, 1, null)
    }
}

class Slider {
    position: number
    value: number 
    prev: Slider
    next: Slider

    constructor(position: number, value: number, prev: Slider | null, next: Slider | null ) {
        this.position = position
        this.value = value
        this.prev = prev
        this.next = next
    }
}