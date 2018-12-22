class Timer {
    
    constructor(ms) {
        this.ms = ms;
        this.GetTimeElapsed = this.getTimeElapsed;
        this.el = this.generateEl("timer", "timer");
    }

    generateEl(id, className) {
        let el = document.createElement("div");
        el.className = className;
        el.setAttribute("id", id);
        // el.innerHTML = id;
        return el;
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    get Value() {
        return this._value;
    }

    set Value(value){
        this._value = value;
    }

    Start() {
        this.StartTime = Date.now();
        this.isStarted = true;
        setInterval(this.updateValue.bind(this), "1000");
    }

    updateValue() {
        if(this.Value <= 0) {
            const event  = new CustomEvent("TimeIsOver");
            document.dispatchEvent(event);
        }
        this.Value = this.ms - (Date.now() - this.StartTime);
        this.el.innerHTML = this.millisToMinutesAndSeconds(this._value);
    }

    getTimeElapsed() {
        return this.millisToMinutesAndSeconds(Date.now() - this.StartTime);
    }
}