class SliderContainer {
    public sliderList: Slider[]
    public increments: number

    constructor(sliderList: Slider[], increments: number) {
        this.sliderList = []
        this.increments = 50
    }

    create():Slider {
        return new Slider(1, null, null)
    }

    addSlider(slider:Slider) {
        this.sliderList.push(slider)
    }
}

class Slider {
    private position: number
    private value: number 
    private prev: Slider | null
    private next: Slider | null
    private body: HTMLDivElement

    constructor(value: number, prev: Slider | null, next: Slider | null ) {
        this.position = (!!(prev?.position) ? prev.position + 1 : 1)
        this.value = this.position * 10
        this.prev = prev
        this.next = next
        this.body = document.createElement("div")
    }

    moveValue() {
        
    }
}