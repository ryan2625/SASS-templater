class SliderContainer {
    constructor() {

    }

    create():Slider {
        return new Slider(1, 1)
    }
}

class Slider {
    position: number
    value: number 

    constructor(position: number, value: number) {
        this.position = position
        this.value = value
    }
}