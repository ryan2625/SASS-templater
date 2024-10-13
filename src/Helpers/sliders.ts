class SliderContainer {
    public sliderList: Slider[]
    private body: HTMLDivElement
    private styles: string

    constructor(sliderList: Slider[]) {
        this.sliderList = []
        this.body = document.createElement("div")
        this.styles = ``
    }

    addSlider(slider:Slider) {
        this.sliderList.push(slider)
    }
}

//Be prepared to use boundind rect's BS
//Make CSS class/styles. Absoulte positioning. The value will be the relative X coordinates in pixels. 
//Update value function to ensure the position is not greater than the next position. Add event listeners.

class Slider {
    private position: number
    private value: number 
    private prev: Slider | null
    private next: Slider | null
    private body: HTMLDivElement
    private styles: string

    constructor(value: number, prev: Slider | null, next: Slider | null ) {
        this.position = (!!(prev?.position) ? prev.position + 1 : 1)
        this.value = this.position * 10
        this.prev = prev
        this.next = next
        this.body = document.createElement("div")
        this.styles = ``
    }

    moveValue() {
        
    }
}