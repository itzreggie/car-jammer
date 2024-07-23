const t = ["grass", "grass", "left-gutter", "left-road", "middle-road", "middle-road", "right-road", "right-gutter", "grass", "grass"];
const e = [96, 224];
const s = ["tree", "flower"];
const a = {
    fontFamily: "'Luckiest Guy', cursive",
    fontSize: "24px",
    stroke: "#000000",
    strokeThickness: 4
};

function i(t) {
    return t == null;
}

function r(t, e, s) {
    s = i(s) ? 0 : s;
    const factor = 10 ** s;
    t *= factor;
    e *= factor;
    return Math.round(Math.random() * (e - t) + t) / factor;
}

function o(t) {
    t.scene.key;
    t.cameras.main.fadeIn(256);
}

function n(t, e) {
    t.scene.key;
    t.cameras.main.fadeOut(256);
    t.cameras.main.once("camerafadeoutcomplete", () => {
        t.scene.start(e);
    }, t);
}

function h(t, e, s) {
    t.load.image(e, `./assets/images/${s}`);
}

function c(t, e, s, a, i) {
    t.load.spritesheet(e, `./assets/images/${s}`, {
        frameWidth: a,
        frameHeight: i
    });
}

function d(t, e, s) {
    t.load.audio(e, `./assets/audios/${s}`);
}

function l(t, e, a) {
    if (r(0, 100) > 20) return;
    const i = r(0, s.length - 1);
    const o = s[i];
    t.add.image(e, a, o).setOrigin(r(0, 1, 3)).setDepth(a + 2);
}

function p(e, s) {
    for (let a = 0; a < t.length; a++) {
        const i = t[a];
        const r = a * 32;
        let o = e.add.image(r, s, i).setOrigin(0).setDepth(s);
        e.roadGroup.add(o);
        if (i === "grass") l(e, r, s);
    }
}

function u(t) {
    t.roadGroup = t.add.group();
    for (let e = -32; e < 480; e += 32) {
        p(t, e);
    }
}

function g(t, e) {
    if (e === true) {
        t.character = t.physics.add.sprite(160, 360, "character");
    } else {
        t.character = t.add.image(160, 360, "character");
    }
    t.character.setDepth(480);
}

function m(t, e) {
    const s = t.add.text(160, 384, e, a).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(480).setInteractive();
    t.tweens.add({
        targets: s,
        alpha: 0,
        ease: "Sine.easeOut",
        duration: 1024,
        repeat: -1,
        yoyo: true
    });
    return s;
}

function f(t, e, s, i, r) {
    const o = { ...a, fontSize: r };
    const n = t.add.text(e, s, i, o);
    o.fontSize = "24px";
    return n;
}

function y(t) {
    t.soundControl = t.add.sprite(288, 16, "sound").setOrigin(0).setScrollFactor(0).setDepth(480).setInteractive();
    if (t.sound.mute === true) t.soundControl.setFrame(1);
    t.soundControl.on("pointerdown", (e, s, a, i) => {
        i.stopPropagation();
        const mute = !t.sound.mute;
        t.sound.setMute(mute);
        t.selectSound.play();
        t.soundControl.setFrame(mute === true ? 1 : 0);
    });
}

function C(t) {
    t.accelerateSound = t.sound.add("accelerate");
    t.crashedSound = t.sound.add("crashed");
    t.driveSound = t.sound.add("drive");
    t.overtakeSound = t.sound.add("overtake");
    t.selectSound = t.sound.add("select");
    t.startSound = t.sound.add("start");
}

class S extends Phaser.Scene {
    constructor() {
        super("Loading");
    }

    setAssets() {
        h(this, "character", "infinite-cars-character.png");
        h(this, "computer", "infinite-cars-computer.png");
        h(this, "flower", "infinite-cars-flower.png");
        h(this, "grass", "infinite-cars-grass.png");
        h(this, "left-road", "infinite-cars-left-road.png");
        h(this, "middle-road", "infinite-cars-middle-road.png");
        h(this, "right-road", "infinite-cars-right-road.png");
        h(this, "road-cone", "infinite-cars-road-cone.png");
        h(this, "tree", "infinite-cars-tree.png");
        h(this, "left-gutter", "infinite-cars-left-gutter.png");
        h(this, "right-gutter", "infinite-cars-right-gutter.png");
        c(this, "explosion", "infinite-cars-explosion.png", 32, 32);
        c(this, "stop-light", "infinite-cars-stop-light.png", 96, 240);
        c(this, "sound", "infinite-cars-sound.png", 16, 16);
        d(this, "accelerate", "accelerate.wav");
        d(this, "crashed", "crashed.wav");
        d(this, "drive", "drive.wav");
        d(this, "overtake", "overtake.wav");
        d(this, "select", "select.wav");
        d(this, "start", "start.wav");
    }

    createLoader() {
        const t = this.add.graphics();
        const e = this.add.graphics();
        t.fillStyle(0xFFFFFF, 1);
        t.fillRect(64, 228, 192, 24);
        this.load.on("progress", t => {
            e.clear();
            e.fillStyle(0x1488AA, 1);
            e.fillRect(66, 230, 188 * t, 20);
        });
        this.load.on("fileprogress", t => { t.key });
        this.load.on("complete", t => {
            t.totalComplete;
            t.totalToLoad;
            n(this, "Main");
        });
    }

    preload() {
        this.setAssets();
        this.createLoader();
        this.load.on("complete", t => {
            t.totalComplete;
            t.totalToLoad;
            n(this, "Main");
        });
    }
}


class w extends Phaser.Scene {
    constructor() {
        super("Main");
    }

    addBanner() {
        const t = "#ffd541";
        const e = "#df3e23";
        f(this, 160, 128, "Car Jammer", "40px")
            .setDepth(480)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setColor(t)
            .setStroke(e, 8);
        f(this, 160, 176, "Car race game", "24px")
            .setDepth(480)
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setColor(t)
            .setStroke(e, 8);
    }

    addStartButton() {
        const t = m(this, "Press anywhere");
        t.x, t.y;
        this.input.once("pointerdown", () => {
            this.selectSound.play();
            n(this, "Game");
        });
    }

    addHighScore() {
        try {
            const t = 480;
            const e = localStorage.getItem("carJammerHighScore");
            f(this, 16, 16, `High score: ${e !== null ? e : ""}`, "16px")
                .setDepth(t + 100);
        } catch (t) { }
    }

    initialize() {
        u(this);
        g(this, false);
        y(this);
        C(this);
        this.addBanner();
        this.addStartButton();
        this.addHighScore();
    }

    create() {
        o(this);
        this.initialize();
    }
}

class v extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    setCamera() {
        this.cameras.main.startFollow(this.character, true, 0, 1, 0, 120);
    }

    createExplosionAnimation() {
        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    }

    drawBoundary() { }

    setCharacterBoundary() {
        let t = e[0];
        let s = e[1];
        this.boundary = new Phaser.Geom.Rectangle(t, -32, s - t, 480);
        this.character.setCollideWorldBounds(true);
        this.character.body.setBoundsRectangle(this.boundary);
        this.drawBoundary();
    }

    setControls() {
        this.character.setInteractive();
        this.input.setDraggable(this.character);
        this.input.on("drag", (t, e, s, a) => {
            if (!this.physics.world.isPaused) {
                this.character.setX(s);
            }
        });
    }

    addObjects() {
        this.roadCones = this.physics.add.staticGroup();
        this.computerCars = this.physics.add.group();
        this.computerCars.defaults = {};
    }

    addExplosion() {
        this.add.sprite(this.character.x, this.character.y, "explosion")
            .setDepth(480)
            .setScale(1.5)
            .anims.play("explosion");
    }

    createRetryButton() {
        const t = m(this, "Press anywhere");
        t.x, t.y;
        this.input.once("pointerdown", () => {
            this.crashedSound.stop();
            this.selectSound.play();
            this.scene.restart();
        });
    }

    setHighScore() {
        const t = this.score.getData("value");
        try {
            let e = localStorage.getItem("carJammerHighScore");
            e = parseFloat(e);
            if (e > t) return;
            localStorage.setItem("carJammerHighScore", t);
        } catch (t) { }
    }

    setGameOver() {
        this.physics.world.pause();
        this.setHighScore();
        f(this, 160, 240, "Crashed!", "24px")
            .setDepth(580)
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0);
        try {
            const t = localStorage.getItem("carJammerHighScore");
            f(this, 160, 272, `High score: ${t}`, "16px")
                .setDepth(580)
                .setOrigin(0.5, 0.5)
                .setScrollFactor(0);
        } catch (t) { }
        this.addExplosion();
        this.accelerateSound.stop();
        this.driveSound.stop();
        this.crashedSound.play();
        this.createRetryButton();
    }

    setCollisions() {
        this.physics.add.collider(this.character, this.roadCones, () => {
            this.setGameOver();
        });
        this.physics.add.collider(this.character, this.computerCars, () => {
            this.setGameOver();
        });
        this.physics.add.collider(this.roadCones, this.roadCones);
        this.physics.add.collider(this.roadCones, this.computerCars);
        this.physics.add.collider(this.computerCars, this.computerCars);
    }

    initializeScore() {
        this.score = f(this, 16, 16, "Score: 0", "16px")
            .setDepth(580)
            .setScrollFactor(0)
            .setDataEnabled()
            .setData("value", 0);
    }

    setStarter() {
        this.anims.create({
            key: "stop-light",
            frames: this.anims.generateFrameNumbers("stop-light", { start: 0, end: 3 }),
            frameRate: 1
        });
        this.stopLight = this.add.sprite(160, 240, "stop-light")
            .setScrollFactor(0)
            .setDepth(480);
        this.instructions = f(this, 160, 400, "Drag the red car to move", "16px")
            .setDepth(480)
            .setOrigin(0.5)
            .setScrollFactor(0);
        this.stopLight.anims.play("stop-light");
        this.startSound.play();
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.physics.world.resume();
                this.tweens.add({
                    targets: [this.stopLight, this.instructions],
                    alpha: 0,
                    ease: "Sine.easeOut",
                    duration: 512,
                    onComplete: () => {
                        this.stopLight.destroy();
                        this.instructions.destroy();
                        this.accelerateSound.play();
                        this.accelerateSound.addListener("complete", () => {
                            this.driveSound.play({ loop: true });
                        });
                    }
                });
            }
        });
    }

    initialize() {
        this.lowestMapY = -32;
        u(this);
        g(this, true);
        y(this);
        C(this);
        this.physics.world.pause();
        this.setCharacterBoundary();
        this.setControls();
        this.setCamera();
        this.createExplosionAnimation();
        this.addObjects();
        this.setCollisions();
        this.character.setVelocityY(-192);
        this.initializeScore();
        this.setStarter();
    }

    create() {
        o(this);
        this.initialize();
    }

    repositionBoundary() {
        const t = e[0];
        this.boundary.setPosition(t, this.cameras.main.scrollY);
        this.drawBoundary();
    }

    addRoad() {
        if (this.cameras.main.scrollY - 32 > this.lowestMapY) return false;
        this.lowestMapY -= 32;
        p(this, this.lowestMapY);
        return true;
    }

    getRoadBoundary() {
        return r(e[0], e[1], 3);
    }

    addRoadCone() {
        if (r(0, 100) > 6.5) return;
        const t = this.getRoadBoundary();
        const e = this.physics.add.staticImage(t, this.lowestMapY, "road-cone").setDepth(480);
        this.roadCones.add(e);
    }

    removeRoadCone() {
        for (const t of this.roadCones.getChildren()) {
            if (t.y > this.character.y + 120) {
                t.destroy();
                break;
            }
        }
    }

    addComputerCar() {
        if (r(1, 100) > 6.5) return;
        const t = !(r(1, 100) < 50);
        const e = this.getRoadBoundary();
        let s = this.lowestMapY;
        let a = 96;
        let i = 144;
        if (t) {
            s += 960;
            a = 256;
            i = 320;
        }
        const o = r(a, i);
        const n = this.physics.add.sprite(e, s, "computer")
            .setDepth(480)
            .setOrigin(0.5, 1)
            .refreshBody()
            .setDataEnabled()
            .setData("isFast", t)
            .setData("velocity", -1 * o)
            .setVelocityY(-o);
        this.computerCars.add(n);
    }

    removeComputerCar() {
        const t = this.character.y;
        for (const e of this.computerCars.getChildren()) {
            const s = e.data.list.isFast;
            const a = e.y;
            if ((!s && a > t + 120) || (s && a < t - 960)) {
                e.destroy();
                break;
            }
        }
    }

    dodgeComputerCar() {
        for (const t of this.computerCars.getChildren()) {
            const s = t.width;
            const a = t.x;
            const o = t.y;
            const n = [].concat(this.roadCones.getChildren(), this.computerCars.getChildren());
            let h = t.data.list.direction;
            let c = false;
            for (const t of n) {
                const e = t.width;
                const i = t.x;
                const r = t.y;
                if (!(r > o) && (Math.abs(r - o) <= 240 && (a - s / 2 < i - e / 2 && a + s / 2 > i - e / 2 || i - e / 2 < a - s / 2 && i + e / 2 > a - s / 2))) {
                    c = true;
                    break;
                }
            }
            if (c) {
                if (i(h)) h = r(0, 1);
                if (h === 0) h = -1;
                if ((h === -1 && a - s / 2 < e[0]) || (h === 1 && a + s / 2 > e[1])) {
                    h *= -1;
                }
                t.setData("direction", h);
                t.setVelocityX(48 * h);
            } else {
                t.setVelocityX(0);
                t.setVelocityY(t.data.list.velocity);
            }
        }
    }

    setScore() {
        const t = Math.abs(this.character.y - 360);
        const e = Math.round(100 * t) /100;
        const s = `score: ${e}`;
        this.score.setText(s);
        this.score.setData("value", e);
    }

    setOvertake() {
        for (const t of this.computerCars.getChildren()) {
            if (Math.floor(t.y) === Math.floor(this.character.y)) {
                this.overtakeSound.play();
            }
        }
    }

    updateWorld() {
        if (this.physics.world.isPaused) return;
        this.repositionBoundary();
        if (this.addRoad()) {
            this.addRoadCone();
            this.addComputerCar();
        }
        this.removeRoadCone();
        this.removeComputerCar();
        this.dodgeComputerCar();
        this.setScore();
        this.setOvertake();
    }

    update() {
        this.updateWorld();
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    parent: "car jammer",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: { debug: false }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 480,
        min: { width: 40, height: 60 },
        max: { width: 1280, height: 1920 }
    },
    scene: [S, w, v]
});
