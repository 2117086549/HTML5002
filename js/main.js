var s_iScaleFactor = 1,
    s_iOffsetX, s_iOffsetY, s_bIsIphone = !1,
    s_bIsRetina;
(function(c) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(c.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(c) {
    console.log(c)
}

function getSize(c) {
    var d = c.toLowerCase(),
        a = window.document,
        e = a.documentElement;
    if (void 0 === window["inner" + c]) c = e["client" + c];
    else if (window["inner" + c] != e["client" + c]) {
        var f = a.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var b = a.createElement("div");
        b.id = "vpw-test-d";
        b.style.cssText = "position:absolute;top:-1000px";
        b.innerHTML = "<style>@media(" + d + ":" + e["client" + c] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        f.appendChild(b);
        e.insertBefore(f, a.head);
        c = 7 == b["offset" + c] ? e["client" + c] : window["inner" + c];
        e.removeChild(f)
    } else c = window["inner" + c];
    return c
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function isIOS() {
    isRetina();
    for (var c = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); c.length;)
        if (navigator.platform === c.pop()) return s_bIsIphone = !0;
    return s_bIsIphone = !1
}

function isRetina() {
    s_bIsRetina = matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches ? !0 : !1
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var c = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < c ? c : 0
}

function inIframe() {
    try {
        return window.self !== window.top
    } catch (c) {
        return !0
    }
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var c;
        c = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width");
        _checkOrientation(d, c);
        var a = Math.min(c / CANVAS_HEIGHT, d / CANVAS_WIDTH),
            e = CANVAS_WIDTH * a,
            a = CANVAS_HEIGHT * a;
        if (s_bMobile && !s_bIsIphone) $("#canvas").css("width", e + "px"), $("#canvas").css("height", a + "px");
        else {
            s_oStage.canvas.width = e;
            s_oStage.canvas.height = a;
            var f = Math.min(e / CANVAS_WIDTH, a / CANVAS_HEIGHT);
            s_oStage.scaleX = s_oStage.scaleY = f
        }
        var b;
        a < c ? (b = c - a, a += b, e += CANVAS_WIDTH / CANVAS_HEIGHT * b) : e < d && (b = d - e, e += b, a += CANVAS_HEIGHT / CANVAS_WIDTH * b);
        b = c / 2 - a / 2;
        var g = d / 2 - e / 2,
            f = CANVAS_WIDTH / e;
        if (g * f < -EDGEBOARD_X || b * f < -EDGEBOARD_Y) a = Math.min(c / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), e = CANVAS_WIDTH * a, a *= CANVAS_HEIGHT, b = (c - a) / 2, g = (d - e) / 2, f = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * g * f;
        s_iOffsetY = -1 * b * f;
        0 <= b && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX,
            s_iOffsetY);
        s_bIsRetina ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * e, s_oStage.canvas.height = 2 * a, canvas.style.width = e + "px", canvas.style.height = a + "px", f = Math.min(e / CANVAS_WIDTH, a / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = 2 * f) : s_bMobile ? ($("#canvas").css("width", e + "px"), $("#canvas").css("height", a + "px")) : (s_oStage.canvas.width = e, s_oStage.canvas.height = a, s_iScaleFactor = Math.min(e / CANVAS_WIDTH, a / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > b ? $("#canvas").css("top", b + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px")
    }
}

function _checkOrientation(c, d) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (c > d ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()))
}

function playSound(c, d, a) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? createjs.Sound.play(c, {
        loop: a,
        volume: d
    }) : null
}

function stopSound(c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || c.stop()
}

function setVolume(c, d) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) c.volume = d
}

function setMute(c, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || c.setMute(d)
}

function createBitmap(c, d, a) {
    var e = new createjs.Bitmap(c),
        f = new createjs.Shape;
    d && a ? f.graphics.beginFill("#fff").drawRect(0, 0, d, a) : f.graphics.beginFill("#ff0").drawRect(0, 0, c.width, c.height);
    e.hitArea = f;
    return e
}

function createSprite(c, d, a, e, f, b) {
    c = null !== d ? new createjs.Sprite(c, d) : new createjs.Sprite(c);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect(-a, -e, f, b);
    c.hitArea = d;
    return c
}

function pad(c, d, a) {
    c += "";
    return c.length >= d ? c : Array(d - c.length + 1).join(a || "0") + c
}

function randomFloatBetween(c, d, a) {
    "undefined" === typeof a && (a = 2);
    return parseFloat(Math.min(c + Math.random() * (d - c), d).toFixed(a))
}

function rotateVector2D(c, d) {
    var a = d.getX() * Math.cos(c) + d.getY() * Math.sin(c),
        e = d.getX() * -Math.sin(c) + d.getY() * Math.cos(c);
    d.set(a, e)
}

function tweenVectorsOnX(c, d, a) {
    return c + a * (d - c)
}

function shuffle(c) {
    for (var d = c.length, a, e; 0 !== d;) e = Math.floor(Math.random() * d), --d, a = c[d], c[d] = c[e], c[e] = a;
    return c
}

function bubbleSort(c) {
    var d;
    do {
        d = !1;
        for (var a = 0; a < c.length - 1; a++) c[a] > c[a + 1] && (d = c[a], c[a] = c[a + 1], c[a + 1] = d, d = !0)
    } while (d)
}

function compare(c, d) {
    return c.index > d.index ? -1 : c.index < d.index ? 1 : 0
}

function easeLinear(c, d, a, e) {
    return a * c / e + d
}

function easeInQuad(c, d, a, e) {
    return a * (c /= e) * c + d
}

function easeInSine(c, d, a, e) {
    return -a * Math.cos(c / e * (Math.PI / 2)) + a + d
}

function easeInCubic(c, d, a, e) {
    return a * (c /= e) * c * c + d
}

function getTrajectoryPoint(c, d) {
    var a = new createjs.Point,
        e = (1 - c) * (1 - c),
        f = c * c;
    a.x = e * d.start.x + 2 * (1 - c) * c * d.traj.x + f * d.end.x;
    a.y = e * d.start.y + 2 * (1 - c) * c * d.traj.y + f * d.end.y;
    return a
}

function formatTime(c) {
    c /= 1E3;
    var d = Math.floor(c / 60);
    c = parseFloat(c - 60 * d).toFixed(1);
    var a = "",
        a = 10 > d ? a + ("0" + d + ":") : a + (d + ":");
    return 10 > c ? a + ("0" + c) : a + c
}

function degreesToRadians(c) {
    return c * Math.PI / 180
}

function checkRectCollision(c, d) {
    var a, e;
    a = getBounds(c, .9);
    e = getBounds(d, .98);
    return calculateIntersection(a, e)
}

function calculateIntersection(c, d) {
    var a, e, f, b, g, h, k, l;
    a = c.x + (f = c.width / 2);
    e = c.y + (b = c.height / 2);
    g = d.x + (h = d.width / 2);
    k = d.y + (l = d.height / 2);
    a = Math.abs(a - g) - (f + h);
    e = Math.abs(e - k) - (b + l);
    return 0 > a && 0 > e ? (a = Math.min(Math.min(c.width, d.width), -a), e = Math.min(Math.min(c.height, d.height), -e), {
        x: Math.max(c.x, d.x),
        y: Math.max(c.y, d.y),
        width: a,
        height: e,
        rect1: c,
        rect2: d
    }) : null
}

function getBounds(c, d) {
    var a = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (c instanceof createjs.Container) {
        a.x2 = -Infinity;
        a.y2 = -Infinity;
        var e = c.children,
            f = e.length,
            b, g;
        for (g = 0; g < f; g++) b = getBounds(e[g], 1), b.x < a.x && (a.x = b.x), b.y < a.y && (a.y = b.y), b.x + b.width > a.x2 && (a.x2 = b.x + b.width), b.y + b.height > a.y2 && (a.y2 = b.y + b.height);
        Infinity == a.x && (a.x = 0);
        Infinity == a.y && (a.y = 0);
        Infinity == a.x2 && (a.x2 = 0);
        Infinity == a.y2 && (a.y2 = 0);
        a.width = a.x2 - a.x;
        a.height = a.y2 - a.y;
        delete a.x2;
        delete a.y2
    } else {
        var h, k;
        c instanceof createjs.Bitmap ? (f = c.sourceRect || c.image, g = f.width * d, h = f.height * d) : c instanceof createjs.Sprite ? c.spriteSheet._frames && c.spriteSheet._frames[c.currentFrame] && c.spriteSheet._frames[c.currentFrame].image ? (f = c.spriteSheet.getFrame(c.currentFrame), g = f.rect.width, h = f.rect.height, e = f.regX, k = f.regY) : (a.x = c.x || 0, a.y = c.y || 0) : (a.x = c.x || 0, a.y = c.y || 0);
        e = e || 0;
        g = g || 0;
        k = k || 0;
        h = h || 0;
        a.regX = e;
        a.regY = k;
        f = c.localToGlobal(0 - e, 0 - k);
        b = c.localToGlobal(g - e, h - k);
        g = c.localToGlobal(g - e, 0 - k);
        e = c.localToGlobal(0 - e, h - k);
        a.x = Math.min(Math.min(Math.min(f.x, b.x), g.x), e.x);
        a.y = Math.min(Math.min(Math.min(f.y, b.y), g.y), e.y);
        a.width = Math.max(Math.max(Math.max(f.x, b.x), g.x), e.x) - a.x;
        a.height = Math.max(Math.max(Math.max(f.y, b.y), g.y), e.y) - a.y
    }
    return a
}

function NoClickDelay(c) {
    this.element = c;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(c) {
    for (var d = c.length, a, e; 0 < d;) e = Math.floor(Math.random() * d), d--, a = c[d], c[d] = c[e], c[e] = a;
    return c
}
NoClickDelay.prototype = {
    handleEvent: function(c) {
        switch (c.type) {
            case "touchstart":
                this.onTouchStart(c);
                break;
            case "touchmove":
                this.onTouchMove(c);
                break;
            case "touchend":
                this.onTouchEnd(c)
        }
    },
    onTouchStart: function(c) {
        c.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(c) {
        this.moved = !0
    },
    onTouchEnd: function(c) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            c = document.elementFromPoint(c.changedTouches[0].clientX, c.changedTouches[0].clientY);
            3 == c.nodeType && (c = c.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            c.dispatchEvent(d)
        }
    }
};
(function() {
    function c(a) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in c ? document.body.className = c[a.type] : (document.body.className = this[d] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", c) : (d = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", c) : (d = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", c) : (d = "msHidden") in document ? document.addEventListener("msvisibilitychange", c) : "onfocusin" in document ? document.onfocusin = document.onfocusout = c : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = c
})();

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(c) {
    for (var d = window.location.search.substring(1).split("&"), a = 0; a < d.length; a++) {
        var e = d[a].split("=");
        if (e[0] == c) return e[1]
    }
}

function CSpriteLibrary() {
    var c, d, a, e, f, b;
    this.init = function(g, h, k) {
        a = d = 0;
        e = g;
        f = h;
        b = k;
        c = {}
    };
    this.addSprite = function(a, b) {
        c.hasOwnProperty(a) || (c[a] = {
            szPath: b,
            oSprite: new Image
        }, d++)
    };
    this.getSprite = function(a) {
        return c.hasOwnProperty(a) ? c[a].oSprite : null
    };
    this._onSpritesLoaded = function() {
        f.call(b)
    };
    this._onSpriteLoaded = function() {
        e.call(b);
        ++a == d && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var a in c) c[a].oSprite.oSpriteLibrary = this, c[a].oSprite.onload = function() {
            this.oSpriteLibrary._onSpriteLoaded()
        }, c[a].oSprite.src = c[a].szPath
    };
    this.getNumSprites = function() {
        return d
    }
}
var CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1080,
    EDGEBOARD_X = 256,
    EDGEBOARD_Y = 84,
    PRIMARY_FONT = "comfortaabold",
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    ENABLE_FULLSCREEN = !0,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    STATE_SELECT_PLAYERS = 4,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_CARD_DEALED = 6,
    ENABLE_CHECK_ORIENTATION, AD_SHOW_COUNTER, NUM_PLAYERS, STARTING_NUM_CARDS, CARD_WIDTH = 156,
    CARD_HEIGHT = 242,
    aHandPos = [];
aHandPos.num_player_2 = [{
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 350
}, {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 - 350
}];
aHandPos.num_player_3 = [{
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 350
}, {
    x: CANVAS_WIDTH / 2 - 650,
    y: CANVAS_HEIGHT / 2 - 40
}, {
    x: CANVAS_WIDTH / 2 + 650,
    y: CANVAS_HEIGHT / 2
}];
aHandPos.num_player_4 = [{
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 350
}, {
    x: CANVAS_WIDTH / 2 - 650,
    y: CANVAS_HEIGHT / 2 - 40
}, {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 - 350
}, {
    x: CANVAS_WIDTH / 2 + 650,
    y: CANVAS_HEIGHT / 2 - 40
}];
TEXT_GAMEOVER = "CONGRATULATION! YOU WON!";
TEXT_LOSE = "SORRY, THE PLAYER ";
TEXT_LOSE2 = " WON THIS GAME";
TEXT_SCORE = "YOUR SCORE";
TEXT_RESTART = "RESTART";
TEXT_MOVES = "MOVES";
TEXT_ARE_SURE = "ARE YOU SURE?";
TEXT_SELECT_PLAYERS = "SELECT THE NUMBER OF PLAYERS !";
TEXT_SELECT_COLOR = "SELECT A COLOR ";
TEXT_PLAYER = "PLAYER";
TEXT_TUTORIAL1 = "WELCOME TO FOUR COLORS! MATCH CARDS BY COLOR OR NUMBER AND BE THE FIRST TO GET RID OF THEM!";
TEXT_TUTORIAL2 = "ACTION CARDS WILL MIX THE GAME UP!\n\nDRAW TWO FORCES THE NEXT PLAYER TO PICK TWO CARDS AND FORFEIT THE TURN";
TEXT_TUTORIAL3 = "SKIP CARD STOPS THE NEXT PLAYER";
TEXT_TUTORIAL4 = "REVERSE CARD SWITCHES THE GAME WISE";
TEXT_TUTORIAL5 = "THE WILD CARD CAN BE PLACED ON ANY CARD AT ANY TIME AND ALLOWS YOU TO CHANGE THE COLOR TO PLAY ";
TEXT_TUTORIAL6 = "THE WILD DRAW FOUR IS A SPECIAL WILD THAT ALLOWS YOU TO CHANGE THE COLOR AND FORCES THE NEXT PLAYER TO PICK 4 CARDS. TO USE THIS CARD YOU MUST HAVE NO OTHER ALTERNATIVE CARDS TO PLAY";
TEXT_TUTORIAL7 = "DO NOT FORGET TO PRESS THE 1 BUTTON WHEN YOU'LL HAVE ONLY ONE CARD LEFT OR YOU'LL PICK 2 PENALTY CARDS!";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var c, d, a, e, f, b, g;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        g = new createjs.Container;
        s_oStage.addChild(g)
    };
    this.unload = function() {
        g.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(b).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        g.addChild(h);
        h = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(h);
        e.x = CANVAS_WIDTH / 2 - h.width / 2;
        e.y = CANVAS_HEIGHT - 170;
        g.addChild(e);
        c = h.width;
        d = h.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, 1, d);
        g.addChild(f);
        e.mask = f;
        a = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT - 125;
        a.shadow = new createjs.Shadow("#000", 2, 2, 2);
        a.textBaseline = "alphabetic";
        a.textAlign = "center";
        g.addChild(a);
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0;
        g.addChild(b)
    };
    this.refreshLoader = function(b) {
        a.text = b + "%";
        f.graphics.clear();
        b = Math.floor(b * c / 100);
        f.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, b, d)
    };
    this._init()
}

function CMain(c) {
    var d, a = 0,
        e = 0,
        f = STATE_LOADING,
        b, g, h;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !0;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(FPS), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        d = !0
    };
    this.soundLoaded = function() {
        a++;
        g.refreshLoader(Math.floor(a / e * 100));
        if (a === e) this.onRemovePreloader()
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack"), createjs.Sound.registerSound("./sounds/card_dealing.ogg", "card_dealing"), createjs.Sound.registerSound("./sounds/snap.ogg", "snap"), createjs.Sound.registerSound("./sounds/press_button.ogg", "click"), createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over"), createjs.Sound.registerSound("./sounds/card.ogg", "card"), createjs.Sound.registerSound("./sounds/special_card.ogg", "special_card"), createjs.Sound.registerSound("./sounds/change_color.ogg", "change_color")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound("./sounds/card_dealing.mp3", "card_dealing"), createjs.Sound.registerSound("./sounds/snap.mp3", "snap"), createjs.Sound.registerSound("./sounds/press_button.mp3", "click"), createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"), createjs.Sound.registerSound("./sounds/card.mp3", "card"), createjs.Sound.registerSound("./sounds/special_card.mp3", "special_card"), createjs.Sound.registerSound("./sounds/change_color.mp3", "change_color")), e += 6)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("credits_panel", "./sprites/credits_panel.png");
        s_oSpriteLibrary.addSprite("select_color_panel", "./sprites/select_color_panel.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_yes_big", "./sprites/but_yes_big.png");
        s_oSpriteLibrary.addSprite("but_exit_big", "./sprites/but_exit_big.png");
        s_oSpriteLibrary.addSprite("but_uno", "./sprites/but_uno.png");
        s_oSpriteLibrary.addSprite("but_p2", "./sprites/but_p2.png");
        s_oSpriteLibrary.addSprite("but_p3", "./sprites/but_p3.png");
        s_oSpriteLibrary.addSprite("but_p4", "./sprites/but_p4.png");
        s_oSpriteLibrary.addSprite("but_red", "./sprites/oButRed.png");
        s_oSpriteLibrary.addSprite("but_green", "./sprites/oButGreen.png");
        s_oSpriteLibrary.addSprite("but_blue", "./sprites/oButBlue.png");
        s_oSpriteLibrary.addSprite("but_yellow", "./sprites/oButYellow.png");
        s_oSpriteLibrary.addSprite("stop_turn", "./sprites/stop_turn.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_players", "./sprites/bg_select_players.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("but_skip", "./sprites/but_skip.png");
        s_oSpriteLibrary.addSprite("line_player", "./sprites/line_players.png");
        s_oSpriteLibrary.addSprite("cards", "./sprites/cards.png");
        s_oSpriteLibrary.addSprite("colors", "./sprites/colors.png");
        s_oSpriteLibrary.addSprite("draw_four_anim", "./sprites/draw_4.png");
        s_oSpriteLibrary.addSprite("draw_two_anim", "./sprites/draw_2.png");
        s_oSpriteLibrary.addSprite("stop_turn_anim", "./sprites/stop_turn.png");
        s_oSpriteLibrary.addSprite("clock_wise_anim", "./sprites/change_clockwise.png");
        s_oSpriteLibrary.addSprite("change_color", "./sprites/change_color.png");
        s_oSpriteLibrary.addSprite("cloud_uno", "./sprites/cloud.png");
        s_oSpriteLibrary.addSprite("finger", "./sprites/finger.png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        a++;
        g.refreshLoader(Math.floor(a / e * 100));
        if (a === e) this.onRemovePreloader()
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.onRemovePreloader = function() {
        g.unload();
        !1 !== isIOS() || !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || (s_oSoundtrack = createjs.Sound.play("soundtrack", {
            loop: -1
        }));
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoSelectPlayers = function() {
        new CSelectPlayers;
        f = STATE_SELECT_PLAYERS
    };
    this.gotoGame = function() {
        h = new CGame(b);
        f = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        d = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block")
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        d = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none")
    };
    this._update = function(a) {
        if (!1 !== d) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && h.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    b = c;
    ENABLE_CHECK_ORIENTATION = c.check_orientation;
    ENABLE_FULLSCREEN = c.fullscreen;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_bFullscreen = !1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundtrack = null,
    s_oCanvas;

function CTextButton(c, d, a, e, f, b, g) {
    var h, k, l, q, m;
    this._init = function(a, b, c, d, e, f, g) {
        h = [];
        k = [];
        var t = createBitmap(c),
            u = Math.ceil(g / 20);
        m = new createjs.Text(d, " " + g + "px " + e, "#000000");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        var n = m.getBounds();
        m.x = c.width / 2 + u;
        m.y = Math.floor(c.height / 2) + n.height / 3 + u;
        q = new createjs.Text(d, " " + g + "px " + e, f);
        q.textAlign = "center";
        q.textBaseline = "alphabetic";
        n = q.getBounds();
        q.x = c.width / 2;
        q.y = Math.floor(c.height / 2) + n.height / 3;
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        l.regX = c.width / 2;
        l.regY = c.height / 2;
        l.addChild(t, m, q);
        s_oStage.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown");
        l.off("pressup");
        s_oStage.removeChild(l)
    };
    this.setVisible = function(a) {
        l.visible = a
    };
    this._initListener = function() {
        oParent = this;
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        h[a] = b;
        k[a] = c
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    };
    this.setTextPosition = function(a) {
        q.y = a;
        m.y = a + 2
    };
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    };
    this.setX = function(a) {
        l.x = a
    };
    this.setY = function(a) {
        l.y = a
    };
    this.getButtonImage = function() {
        return l
    };
    this.getX = function() {
        return l.x
    };
    this.getY = function() {
        return l.y
    };
    this._init(c, d, a, e, f, b, g);
    return this
}

function CToggle(c, d, a, e, f) {
    var b, g, h, k;
    this._init = function(a, c, d, e, f) {
        g = [];
        h = [];
        var l = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        b = e;
        k = createSprite(l, "state_" + b, d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        k.x = a;
        k.y = c;
        k.stop();
        f.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        s_bMobile ? k.off("mousedown", this.buttonDown) : (k.off("mousedown", this.buttonDown), k.off("mouseover", this.buttonOver));
        k.off("pressup", this.buttonRelease);
        f.removeChild(k)
    };
    this._initListener = function() {
        if (s_bMobile) k.on("mousedown", this.buttonDown);
        else k.on("mousedown", this.buttonDown), k.on("mouseover", this.buttonOver);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        h[a] = c
    };
    this.setActive = function(a) {
        b = a;
        k.gotoAndStop("state_" + b)
    };
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        b = !b;
        k.gotoAndStop("state_" +
            b);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP], b)
    };
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN])
    };
    this.buttonOver = function(a) {
        s_bMobile || (a.target.cursor = "pointer")
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this._init(c, d, a, e, f)
}

function CGfxButton(c, d, a, e) {
    var f, b, g, h, k, l;
    this._init = function(a, c, d, e) {
        f = !1;
        b = 1;
        g = [];
        h = [];
        k = createBitmap(d);
        k.x = a;
        k.y = c;
        k.scaleX = k.scaleY = b;
        k.regX = d.width / 2;
        k.regY = d.height / 2;
        e.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        s_bMobile ? k.off("mousedown", this.buttonDown) : (k.off("mousedown", this.buttonDown), k.off("mouseover", this.buttonOver));
        k.off("pressup", this.buttonRelease);
        e.removeChild(k)
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this.setClickable = function(a) {
        f = !a
    };
    this._initListener = function() {
        if (s_bMobile) k.on("mousedown", this.buttonDown);
        else k.on("mousedown", this.buttonDown), k.on("mouseover", this.buttonOver);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        h[a] = c
    };
    this.buttonRelease = function() {
        f || (k.scaleX = b, k.scaleY = b, g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        f || (k.scaleX = .9 * b, k.scaleY = .9 * b, playSound("click", 1, 0), g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]))
    };
    this.buttonOver = function(a) {
        s_bMobile || f || (a.target.cursor = "pointer")
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(k).to({
            scaleX: .9 * b,
            scaleY: .9 * b
        }, 850, createjs.Ease.quadOut).to({
            scaleX: b,
            scaleY: b
        }, 650, createjs.Ease.quadIn).call(function() {
            l.pulseAnimation()
        })
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(k).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            l.trebleAnimation()
        })
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this.setX = function(a) {
        k.x = a
    };
    this.setY = function(a) {
        k.y = a
    };
    this.getButtonImage = function() {
        return k
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    l = this;
    this._init(c, d, a, e);
    return this
}

function CPanelTutorial() {
    var c, d, a, e, f, b, g;
    this.init = function() {
        var h;
        s_oInterface.setButtonUno(!1);
        g = new createjs.Container;
        b = 0;
        c = new createjs.Container;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        d = new createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.regX = 398;
        d.regY = 258.5;
        d.alpha = .8;
        c.addChild(d);
        s_oStage.addChild(c);
        a = new CGfxButton(c.getBounds().width / 2 - 50, 0, s_oSpriteLibrary.getSprite("but_arrow"), c);
        a.addEventListener(ON_MOUSE_DOWN, this.onButNext, this);
        h = s_oSpriteLibrary.getSprite("but_arrow");
        e = new CGfxButton(-(c.getBounds().width / 2 - 50), 0, h, c);
        e.addEventListener(ON_MOUSE_DOWN, this.onButBack, this);
        e.getButtonImage().rotation = 180;
        f = new CGfxButton(c.getBounds().width / 2 - 53, c.getBounds().height / 2 - 53, s_oSpriteLibrary.getSprite("but_skip"), c);
        f.addEventListener(ON_MOUSE_DOWN, this.onButSkip, this);
        this.loadPage(b)
    };
    this.loadPage = function(b) {
        var d;
        switch (b) {
            case 0:
                e.setVisible(!1);
                b = new createjs.Text(TEXT_TUTORIAL1, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -95;
                b.align = "center";
                d = new CCard(-215, 0, g, "card_1_7", 0, 0);
                g.addChild(b);
                d.setAnimTutorial("tutorial");
                c.addChild(g);
                break;
            case 1:
                e.setVisible(!0);
                b = new createjs.Text(TEXT_TUTORIAL2, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -130;
                b.align = "center";
                d = new CCard(-215, 0, g, "card_0_12", 0, 0);
                g.addChild(b);
                d.setAnimTutorial("draw2tutorial");
                break;
            case 2:
                b = new createjs.Text(TEXT_TUTORIAL3, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -45;
                b.align = "center";
                d = new CCard(-215, 0, g, "card_1_7", 0, 0);
                g.addChild(b);
                d.setAnimTutorial("stopTurnTutorial");
                break;
            case 3:
                b = new createjs.Text(TEXT_TUTORIAL4, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -55;
                b.align = "center";
                d = new CCard(-215, 0, g, "card_1_7", 0, 0);
                g.addChild(b);
                d.setAnimTutorial("changeClockWiseTutorial");
                break;
            case 4:
                b = new createjs.Text(TEXT_TUTORIAL5, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -95;
                b.align = "center";
                d = new CCard(-215, 0, g, "color", 0, 0);
                g.addChild(b);
                d.instantShow();
                break;
            case 5:
                a.setVisible(!0);
                b = new createjs.Text(TEXT_TUTORIAL6, " 30px " + PRIMARY_FONT, "#FFFFFF");
                b.lineWidth = 320;
                b.x = -60;
                b.y = -170;
                b.align = "center";
                d = new CCard(-215, 0, g, "draw_four", 0, 0);
                g.addChild(b);
                d.instantShow();
                break;
            case 6:
                a.setVisible(!1), b = new createjs.Text(TEXT_TUTORIAL7, " 30px " + PRIMARY_FONT, "#FFFFFF"), b.lineWidth = 320, b.x = -60, b.y = -100, b.align = "center", d = new createBitmap(s_oSpriteLibrary.getSprite("but_uno")), d.regX = 50, d.regY = 50.5, d.x = -215, d.scaleX = 1.5, d.scaleY = 1.5, g.addChild(b), g.addChild(d)
        }
    };
    this.onButNext = function() {
        b++;
        g.removeAllChildren();
        this.loadPage(b)
    };
    this.onButBack = function() {
        b--;
        g.removeAllChildren();
        this.loadPage(b)
    };
    this.onButSkip = function() {
        s_oStage.removeChild(c);
        s_oInterface.setButtonUno(!0);
        s_oGame.startGame()
    };
    this.init()
}

function CTurnManager() {
    var c, d = 0,
        a = 0;
    this.init = function() {
        c = !0;
        a = 0;
        d = 3 === a ? 0 : a + 1;
        s_oTurnManager = this
    };
    this.changeClockWise = function() {
        c = !0 === c ? !1 : !0
    };
    this.nextTurn = function() {
        !0 === c ? a === NUM_PLAYERS - 1 ? (a = 0, d = 1) : (a++, d = a === NUM_PLAYERS - 1 ? 0 : a + 1) : 0 === a ? (a = NUM_PLAYERS - 1, d = NUM_PLAYERS - 2) : (a--, d = 0 === a ? NUM_PLAYERS - 1 : a - 1)
    };
    this.checkTurn = function() {
        return a
    };
    this.prevTurn = function() {
        !0 === c ? 0 === a ? (a = NUM_PLAYERS - 1, d = NUM_PLAYERS - 2) : (a--, d = 0 === a ? NUM_PLAYERS - 1 : a - 1) : a === NUM_PLAYERS - 1 ? (a = 0, d = 1) : (a++, d = a === NUM_PLAYERS -
            1 ? 0 : a + 1)
    };
    this.checkPrevTurn = function() {
        return !0 === c ? 0 === a ? NUM_PLAYERS - 1 : a - 1 : a === NUM_PLAYERS - 1 ? 0 : a + 1
    };
    this.checkNextPlayer = function() {
        return d
    };
    this.setTurn = function(e) {
        a = e;
        d = !0 === c ? a === NUM_PLAYERS - 1 ? 0 : a + 1 : 0 === a ? NUM_PLAYERS - 1 : a - 1
    };
    this.getClockWise = function() {
        return c
    };
    this.init()
}
s_oTurnManager = null;

function CListernableObject() {
    var c;
    this._init = function() {
        c = []
    };
    this.addEventListener = function(d, a, e) {
        c[d] = {
            cb: a,
            owner: e
        }
    };
    this.removeEventListener = function(d) {
        c[d] = null
    };
    this.callEvent = function(d, a) {
        c[d] && (a ? c[d].cb.apply(c[d].owner, [a]) : c[d].cb.call(c[d].owner))
    };
    this._init()
}

function CAnimation() {
    var c, d, a, e, f, b, g, h, k;
    this.init = function() {
        g = !1;
        var b = s_oSpriteLibrary.getSprite("draw_four_anim"),
            b = {
                images: [b],
                frames: {
                    width: 292,
                    height: 290,
                    regX: 146,
                    regY: 145
                },
                animations: {
                    anim: {
                        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        next: "stop",
                        speed: .8
                    },
                    reverse: {
                        frames: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                        next: [0],
                        speed: .8
                    },
                    stop: [13]
                }
            },
            b = new createjs.SpriteSheet(b);
        c = new createjs.Sprite(b, 0);
        b = s_oSpriteLibrary.getSprite("draw_two_anim");
        b = {
            images: [b],
            frames: {
                width: 292,
                height: 322,
                regX: 146,
                regY: 161
            },
            animations: {
                anim: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                    next: "stop",
                    speed: .8
                },
                reverse: {
                    frames: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                    next: [0],
                    speed: .8
                },
                stop: [13]
            }
        };
        b = new createjs.SpriteSheet(b);
        d = new createjs.Sprite(b, 0);
        b = s_oSpriteLibrary.getSprite("stop_turn_anim");
        a = new createBitmap(b, 292, 300);
        b = s_oSpriteLibrary.getSprite("clock_wise_anim");
        e = new createBitmap(b, 292, 300);
        b = s_oSpriteLibrary.getSprite("change_color");
        b = {
            images: [b],
            frames: {
                width: 328,
                height: 315,
                regX: 164,
                regY: 157.5
            },
            animations: {
                anim: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                    next: "anim",
                    speed: .8
                },
                stop: [16],
                color_0: {
                    frames: [0, 1, 2, 3, 4, 5, 6],
                    speed: .8
                },
                color_1: {
                    frames: [0, 1, 2],
                    speed: .8
                },
                color_2: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    speed: .8
                },
                color_3: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    speed: .8
                }
            }
        };
        b = new createjs.SpriteSheet(b);
        f = new createjs.Sprite(b, 0)
    };
    this.drawFourAnim = function() {
        c.alpha = 0;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        c.scaleX = .01;
        c.scaleY = .01;
        s_oStage.addChild(c);
        c.stop();
        h = playSound("special_card", .5);
        (new createjs.Tween.get(c)).to({
            alpha: 100,
            scaleX: 1.4,
            scaleY: 1.4
        }, 200, createjs.Ease.cubicOut).wait(200).call(function() {
            c.gotoAndPlay("anim")
        }).wait(1E3).call(function() {
            c.gotoAndPlay("reverse")
        }).wait(200).to({
            alpha: 0,
            scaleX: .01,
            scaleY: .01
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(c);
            s_oGame.onEndDrawFour()
        })
    };
    this.drawTwoAnim = function() {
        d.alpha = 0;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.scaleX = .01;
        d.scaleY = .01;
        s_oStage.addChild(d);
        d.stop();
        h = playSound("special_card", .5);
        (new createjs.Tween.get(d)).to({
            alpha: 100,
            scaleX: 1.4,
            scaleY: 1.4
        }, 200, createjs.Ease.cubicOut).wait(200).call(function() {
            d.gotoAndPlay("anim");
            setVolume(h, .2)
        }).wait(1E3).call(function() {
            d.gotoAndPlay("reverse");
            setVolume(h, .1)
        }).wait(200).to({
            alpha: 0,
            scaleX: .01,
            scaleY: .01
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(d);
            s_oGame.onEndDrawTwo()
        })
    };
    this.stopTurn = function() {
        a.alpha = 0;
        a.regX = 146;
        a.regY = 150;
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2;
        a.scaleX = .01;
        a.scaleY = .01;
        s_oStage.addChild(a);
        playSound("game_over", 1);
        (new createjs.Tween.get(a)).to({
            alpha: 100,
            scaleX: 2,
            scaleY: 2
        }, 200, createjs.Ease.cubicOut).to({
            scaleX: 1.6,
            scaleY: 1.6
        }, 200).to({
            scaleX: 2,
            scaleY: 2
        }, 200).to({
            scaleX: 1.6,
            scaleY: 1.6
        }, 200).to({
            scaleX: 2,
            scaleY: 2
        }, 200).to({
            alpha: 0,
            scaleX: .01,
            scaleY: .01
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(a);
            s_oGame.onNextTurn()
        })
    };
    this.changeClockWise = function(b) {
        e.alpha = 0;
        e.rotation = 0;
        e.regX = 146;
        e.regY = 150;
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2;
        e.scaleX = .01;
        e.scaleY = .01;
        s_oStage.addChild(e);
        h = playSound("special_card", .5);
        !1 === b ? (new createjs.Tween.get(e)).to({
            alpha: 100,
            scaleX: 2,
            scaleY: 2
        }, 200, createjs.Ease.cubicOut).to({
            rotation: 360
        }, 500).wait(500).to({
            rotation: -360
        }, 500).wait(500).to({
            alpha: 0,
            scaleX: .01,
            scaleY: .01
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(e);
            s_oGame.onNextTurn()
        }) : (new createjs.Tween.get(e)).to({
            alpha: 100,
            scaleX: 2,
            scaleY: 2
        }, 200, createjs.Ease.cubicOut).to({
            rotation: -360
        }, 500).wait(500).to({
            rotation: 360
        }, 500).wait(500).to({
            alpha: 0,
            scaleX: .01,
            scaleY: .01
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(e);
            s_oGame.onNextTurn()
        })
    };
    this.changeColor = function(a) {
        b = a;
        f.alpha = 0;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        f.scaleX = .01;
        f.scaleY = .01;
        s_oStage.addChild(f);
        f.stop();
        k = playSound("change_color", .5);
        (new createjs.Tween.get(f)).to({
            alpha: 100,
            scaleX: 1.4,
            scaleY: 1.4
        }, 200, createjs.Ease.cubicOut).call(function() {
            f.gotoAndPlay("anim")
        }).wait(1300).call(function() {
            f.gotoAndStop(16);
            f.gotoAndPlay("color_" + a);
            g = !0;
            f.on("animationend", s_oCAnimation.endAnimation)
        })
    };
    this.endAnimation = function() {
        !0 === g && (stopSound(k), h = playSound("special_card"), g = !1, f.off("animationend", s_oCAnimation.endAnimation), f.stop(), (new createjs.Tween.get(f)).to({
            scaleX: 2,
            scaleY: 2
        }, 250).to({
            scaleX: 1.4,
            scaleY: 1.4
        }, 250).to({
            scaleX: 2,
            scaleY: 2
        }, 250).to({
            scaleX: 1.4,
            scaleY: 1.4
        }, 250).to({
            alpha: 0,
            scaleX: .1,
            scaleY: .1
        }, 200, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(f);
            f.gotoAndStop(0);
            s_oInterface.refreshColor(b);
            s_oGame.onNextTurn()
        }))
    };
    this.init();
    s_oCAnimation = this
}
s_oCAnimation = null;

function CMenu() {
    var c, d, a, e, f, b, g, h, k, l, q, m, n = null,
        v = null;
    this._init = function() {
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(g);
        var p = s_oSpriteLibrary.getSprite("but_play");
        h = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 200, p, s_oStage);
        h.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        p = s_oSpriteLibrary.getSprite("but_info");
        f = p.height / 2 + 20 + p.width;
        b = p.height / 2 + 10;
        q = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 240, p, s_oStage);
        q.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), a = CANVAS_WIDTH - p.height / 2 - 10, e = p.height / 2 + 10, l = new CToggle(a, e, p, s_bAudioActive, s_oStage), l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var p = window.document,
            r = p.documentElement;
        n = r.requestFullscreen || r.mozRequestFullScreen || r.webkitRequestFullScreen || r.msRequestFullscreen;
        v = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n && !inIframe() && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), c = p.width / 4 + 10, d = p.height / 2 + 10, m = new CToggle(c, d, p, s_bFullscreen, s_oStage), m.addEventListener(ON_MOUSE_UP, this._onFullscreen, this));
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 1E3).call(function() {
            k.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        h.unload();
        h = null;
        k.visible = !1;
        q.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(), l = null;
        s_oStage.removeChild(g);
        s_oMenu = g = null
    };
    this.refreshButtonPos = function(g, h) {
        q.setPosition(f + g, h + b);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(a - g, h + e);
        n && !inIframe() && m.setPosition(c + g, d + h)
    };
    this._onFullscreen = function() {
        s_bFullscreen ? (v.call(window.document), s_bFullscreen = !1) : (n.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onCreditsBut = function() {
        new CCreditsPanel
    };
    this._onButPlayRelease = function() {
        this.unload();
        !isIOS() || null !== s_oSoundtrack || !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || (s_oSoundtrack = createjs.Sound.play("soundtrack", {
            loop: -1
        }));
        $(s_oMain).trigger("start_session");
        s_oMain.gotoSelectPlayers()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CSelectPlayers() {
    var c, d, a, e, f, b, g, h, k = null,
        l = null,
        q;
    this._init = function() {
        var m = createBitmap(s_oSpriteLibrary.getSprite("bg_select_players"));
        s_oStage.addChild(m);
        m = s_oSpriteLibrary.getSprite("but_p2");
        f = new CGfxButton(CANVAS_WIDTH / 2 - 450, CANVAS_HEIGHT - 500, m, s_oStage);
        f.addEventListener(ON_MOUSE_UP, this._onButP2, this);
        m = s_oSpriteLibrary.getSprite("but_p3");
        b = new CGfxButton(CANVAS_WIDTH / 2 + 10, CANVAS_HEIGHT - 500, m, s_oStage);
        b.addEventListener(ON_MOUSE_UP, this._onButP3, this);
        m = s_oSpriteLibrary.getSprite("but_p4");
        g = new CGfxButton(CANVAS_WIDTH / 2 + 450, CANVAS_HEIGHT - 500, m, s_oStage);
        g.addEventListener(ON_MOUSE_UP, this._onButP4, this);
        m = new createjs.Text(TEXT_SELECT_PLAYERS, " 55px " + PRIMARY_FONT, "#FFF");
        m.textAlign = "center";
        m.x = CANVAS_WIDTH / 2;
        m.y = 300;
        m.textBaseline = "alphabetic";
        s_oStage.addChild(m);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m = s_oSpriteLibrary.getSprite("audio_icon"), a = CANVAS_WIDTH - m.height / 2 - 10, e = m.height / 2 + 10, q = new CToggle(a, e, m, s_bAudioActive, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var m = window.document,
            n = m.documentElement;
        k = n.requestFullscreen || n.mozRequestFullScreen || n.webkitRequestFullScreen || n.msRequestFullscreen;
        l = m.exitFullscreen || m.mozCancelFullScreen || m.webkitExitFullscreen || m.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (k = !1);
        k && !inIframe() && (m = s_oSpriteLibrary.getSprite("but_fullscreen"), c = m.width / 4 + 10, d = m.height / 2 + 10, h = new CToggle(c, d, m, s_bFullscreen, s_oStage), h.addEventListener(ON_MOUSE_UP, this._onFullscreen, this));
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._onButP2 = function() {
        NUM_PLAYERS = 2;
        this.unload();
        $(s_oMain).trigger("select_players", 2);
        s_oMain.gotoGame()
    };
    this._onButP3 = function() {
        NUM_PLAYERS = 3;
        this.unload();
        $(s_oMain).trigger("select_players", 3);
        s_oMain.gotoGame()
    };
    this._onButP4 = function() {
        NUM_PLAYERS = 4;
        this.unload();
        $(s_oMain).trigger("select_players", 4);
        s_oMain.gotoGame()
    };
    this.unload = function() {
        f.unload();
        b.unload();
        g.unload();
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function(b, f) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || q.setPosition(a - b, f + e);
        k && !inIframe() && h.setPosition(c + b, d + f)
    };
    this._onFullscreen = function() {
        s_bFullscreen ? (l.call(window.document), s_bFullscreen = !1) : (k.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._init()
}
var s_oSelectPlayers;

function CCard(c, d, a, e, f, b) {
    var g = !1,
        h, k, l, q, m, n, v, p, r, t, u;
    this._init = function(b, a, c, d, e, f, g) {
        t = c;
        l = d;
        q = e;
        m = f;
        h = !1;
        k = 0 === m || 2 === m ? "red" : "black";
        r = new createjs.Container;
        r.x = b;
        r.y = a;
        t.addChild(r);
        b = {
            images: [s_oSpriteLibrary.getSprite("cards")],
            frames: {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                regX: CARD_WIDTH / 2,
                regY: CARD_HEIGHT / 2
            },
            animations: {
                card_0_0: [0],
                card_0_1: [1],
                card_0_2: [2],
                card_0_3: [3],
                card_0_4: [4],
                card_0_5: [5],
                card_0_6: [6],
                card_0_7: [7],
                card_0_8: [8],
                card_0_9: [9],
                card_0_10: [10],
                card_0_11: [11],
                card_0_12: [12],
                card_1_0: [13],
                card_1_1: [14],
                card_1_2: [15],
                card_1_3: [16],
                card_1_4: [17],
                card_1_5: [18],
                card_1_6: [19],
                card_1_7: [20],
                card_1_8: [21],
                card_1_9: [22],
                card_1_10: [23],
                card_1_11: [24],
                card_1_12: [25],
                card_2_0: [26],
                card_2_1: [27],
                card_2_2: [28],
                card_2_3: [29],
                card_2_4: [30],
                card_2_5: [31],
                card_2_6: [32],
                card_2_7: [33],
                card_2_8: [34],
                card_2_9: [35],
                card_2_10: [36],
                card_2_11: [37],
                card_2_12: [38],
                card_3_0: [39],
                card_3_1: [40],
                card_3_2: [41],
                card_3_3: [42],
                card_3_4: [43],
                card_3_5: [44],
                card_3_6: [45],
                card_3_7: [46],
                card_3_8: [47],
                card_3_9: [48],
                card_3_10: [49],
                card_3_11: [50],
                card_3_12: [51],
                color: [52],
                draw_four: [53],
                back: [54],
                tutorial: {
                    frames: [20, 5, 47, 31],
                    speed: .1
                },
                draw2tutorial: {
                    frames: [12, 25, 38, 51],
                    speed: .1
                },
                stopTurnTutorial: {
                    frames: [10, 23, 36, 49],
                    speed: .1
                },
                changeClockWiseTutorial: {
                    frames: [11, 24, 37, 50],
                    speed: .1
                }
            }
        };
        b = new createjs.SpriteSheet(b);
        p = createSprite(b, "back", CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT);
        p.stop();
        r.addChild(p);
        p.on("mousedown", this._mouseDown);
        n = [];
        v = []
    };
    this.getCardSprite = function() {
        return p
    };
    this.setAnimTutorial = function(b) {
        p.gotoAndPlay(b)
    };
    this.unload = function() {
        p.off("mousedown", this._mouseDown);
        t.removeChild(r)
    };
    this.unloadEvent = function() {
        p.off("mousedown", this._mouseDown)
    };
    this.saveInfo = function() {
        return {
            szFotogram: l,
            iRank: q,
            iSuit: m,
            bValue: !0
        }
    };
    this.changeInfo = function(b, a, c) {
        l = b;
        q = a;
        m = c
    };
    this.instantShow = function() {
        p.gotoAndStop(l)
    };
    this.setValue = function(b) {
        p.gotoAndStop(l);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || "mute" === b || createjs.Sound.play("card");
        createjs.Tween.get(r).to({
            scaleX: 1
        }, 200).call(function() {})
    };
    this.setActive = function(b) {
        b ? r.addChild(void 0) : r.removeChild(void 0)
    };
    this.setVisible = function(b) {
        r.visible = !0 === b ? !0 : !1
    };
    this.onSetTurned = function() {
        h = !0
    };
    this.offSetTurned = function() {
        h = !1
    };
    this.moveCard = function(b, a, c, d) {
        var e = this;
        createjs.Tween.get(r).wait(d).to({
            x: b,
            y: a
        }, c, createjs.Ease.linear).call(function() {
            s_oGame.playedCard(e)
        })
    };
    this.moveCardFirstHand = function(b, a, c, d) {
        var e = this;
        createjs.Tween.get(r).wait(d).to({
            x: b,
            y: a
        }, c, createjs.Ease.cubicOut).call(function() {
            playSound("card_dealing", 1);
            s_oGame.onCardDealed(e)
        })
    };
    this.moveFirstLastCard = function(b, a, c, d) {
        var e = this;
        createjs.Tween.get(r).wait(d).to({
            x: b,
            y: a
        }, c, createjs.Ease.linear).call(function() {
            s_oGame.onFirstLastCardDealed(e)
        })
    };
    this.setOnTop = function() {
        t.addChildAt(r, t.numChildren - 1)
    };
    this.moveToSuit = function(b, a, c) {
        createjs.Tween.get(r).wait(c).to({
            x: b,
            y: a
        }, 200, createjs.Ease.cubicOut).call(function() {
            s_oGame.stackInSuit(u)
        })
    };
    this.setPlaced = function() {
        g = !0;
        u.showCard()
    };
    this.stackInPlace = function(b, a, c) {
        createjs.Tween.get(r).to({
            x: b,
            y: a
        }, c, createjs.Ease.cubicOut).call(function() {
            h = !0
        })
    };
    this.stackAndDeactive = function(b, a, c) {
        createjs.Tween.get(r).to({
            x: b,
            y: a
        }, c, createjs.Ease.cubicOut)
    };
    this._mouseDown = function(b) {
        !1 !== h && s_oGame.pickCard(u, b)
    };
    this.getPlaced = function() {
        return g
    };
    this.showCard = function(b, a) {
        var c = this;
        createjs.Tween.get(r).wait(b).to({
            scaleX: .1
        }, 200).call(function() {
            c.setValue(a)
        }).call(function() {
            h = !0
        })
    };
    this.showCardNoInput = function(b) {
        var a = this;
        createjs.Tween.get(r).wait(b).to({
            scaleX: .1
        }, 200).call(function() {
            a.setValue()
        }).call(function() {
            h = !1
        })
    };
    this.hideCard = function() {
        var b = this;
        createjs.Tween.get(r).to({
            scaleX: .1
        }, 200).call(function() {
            b.setBack()
        })
    };
    this.setPos = function(b, a) {
        r.x = b;
        r.y = a
    };
    this.setBack = function() {
        h = !1;
        p.gotoAndStop("back");
        var b = this;
        createjs.Tween.get(r).to({
            scaleX: 1
        }, 200).call(function() {
            b.cardHidden()
        })
    };
    this.cardHidden = function() {
        n[ON_CARD_HIDE] && n[ON_CARD_HIDE].call(v[ON_CARD_HIDE], this)
    };
    this.getRank = function() {
        return q
    };
    this.getSuit = function() {
        return m
    };
    this.getColor = function() {
        return k
    };
    this.getFotogram = function() {
        return l
    };
    this.getPos = function() {
        return {
            x: r.x,
            y: r.y
        }
    };
    this.getSprite = function() {
        return r
    };
    this.getLogicRect = function() {
        return new createjs.Rectangle(r.x - CARD_WIDTH / 2, r.y - CARD_HEIGHT / 2, CARD_WIDTH, CARD_HEIGHT)
    };
    this.getTurned = function() {
        return h
    };
    u = this;
    this._init(c, d, a, e, f, b);
    this.getGlobalToLocal = function(b, a) {
        return p.globalToLocal(b / s_oStage.scaleX, a / s_oStage.scaleY)
    }
}

function CDeckDisplayer(c, d) {
    var a, e, f;
    this._init = function() {
        a = [];
        e = new createjs.Container;
        f = !1;
        e.x = c;
        e.y = d;
        s_oStage.addChildAt(e, s_oStage.numChildren);
        e.on("mousedown", this.onDraw, this)
    };
    this.initializeDeck = function() {
        for (var b, c = 0; 4 > c; c++)
            for (var d = 0; 10 > d; d++) b = d, a.push(new CCard(0, 0, e, "card_" + c + "_" + d, b, c));
        for (c = 0; 4 > c; c++)
            for (d = 0; 9 > d; d++) b = d + 1, a.push(new CCard(0, 0, e, "card_" + c + "_" + b, b, c));
        for (c = 0; 4 > c; c++)
            for (d = 0; 2 > d; d++) a.push(new CCard(0, 0, e, "card_" + c + "_10", 10, c)), a.push(new CCard(0, 0, e, "card_" +
                c + "_11", 11, c)), a.push(new CCard(0, 0, e, "card_" + c + "_12", 12, c));
        for (c = 0; 4 > c; c++) a.push(new CCard(0, 0, e, "color", 13, 4)), a.push(new CCard(0, 0, e, "draw_four", 14, 4))
    };
    this.shuffle = function() {
        var b, c, d;
        for (d = a.length; d; d--) b = Math.floor(Math.random() * d), c = a[d - 1], a[d - 1] = a[b], a[b] = c
    };
    this.moveContainer = function(b, a, c, d) {
        createjs.Tween.get(e).wait(d).to({
            x: b,
            y: a
        }, c, createjs.Ease.linear)
    };
    this.takeFirstLastCard = function() {
        for (; 4 === a[a.length - 1].getSuit();) this.shuffle();
        return a.pop()
    };
    this.takeLastCard = function() {
        return a.pop()
    };
    this.getLastCard = function() {
        return a[a.length - 1]
    };
    this.getCardByIndex = function(b) {
        return a[b]
    };
    this.removeCardByIndex = function(b) {
        return a.splice(b, 1)
    };
    this.pushCard = function(b) {
        a.push(b)
    };
    this.getContainer = function() {
        return e
    };
    this.getLength = function() {
        return a.length
    };
    this.onDraw = function() {
        if (!1 === f) s_oGame.onDraw()
    };
    this.disableInputUsedCards = function() {
        a[a.length - 1].offSetTurned()
    };
    this.disableInputDraw = function() {
        f = !0
    };
    this.enableInputDraw = function() {
        f = !1
    };
    this.getIndexChild = function() {
        return s_oStage.getChildIndex(e)
    };
    this.setChildDepth = function(b) {
        s_oStage.addChildAt(e, b)
    };
    this.getGlobalPosition = function() {
        return {
            x: e.x,
            y: e.y
        }
    };
    this.setOnTop = function() {
        s_oStage.addChildAt(e, s_oStage.numChildren)
    };
    this.addNewCardUnderTheDeck = function(b) {
        for (var c = 0; c < b.length; c++) a.unshift(b[c])
    };
    this.removeAllCardUnderTheDeck = function() {
        for (var b = [], c = 0; c < a.length - 1; c++) b.push(a.shift());
        return b
    };
    this._init()
}

function CHandDisplayer(c, d, a, e, f) {
    var b, g, h, k, l, q, m;
    this.init = function() {
        b = c;
        g = d;
        h = [];
        k = new createjs.Container;
        k.x = a;
        k.y = e;
        s_oStage.addChild(k);
        var n = s_oSpriteLibrary.getSprite("line_player"),
            n = {
                images: [n],
                frames: {
                    width: 524,
                    height: 18,
                    regX: 262,
                    regY: 9
                },
                animations: {
                    off: [0],
                    on: [1]
                }
            },
            n = new createjs.SpriteSheet(n);
        l = new createjs.Sprite(n, "off");
        l.stop();
        q = [];
        q[0] = new createjs.Text(TEXT_PLAYER + " 1", " 34px " + PRIMARY_FONT, "#FFFFFF");
        q[0].alpha = .15;
        q[1] = new createjs.Text(TEXT_PLAYER + " 2", " 34px " + PRIMARY_FONT, "#FFFFFF");
        q[1].alpha = .15;
        q[2] = new createjs.Text(TEXT_PLAYER + " 3", " 34px " + PRIMARY_FONT, "#FFFFFF");
        q[2].alpha = .15;
        q[3] = new createjs.Text(TEXT_PLAYER + " 4", " 34px " + PRIMARY_FONT, "#FFFFFF");
        q[3].alpha = .15;
        0 !== b ? (l.x = CANVAS_WIDTH / 2, e > CANVAS_HEIGHT / 2 ? (q[f].x = CANVAS_WIDTH / 2 + 40, l.y = e - 135, q[f].y = e - 178) : (q[f].x = CANVAS_WIDTH / 2 - 195, l.y = e + 135, q[f].y = e + 140)) : (l.y = CANVAS_HEIGHT / 2, a < CANVAS_WIDTH / 2 ? (l.x = a + 100, l.rotation = 90, q[f].x = a + 150, q[f].y = e + 70, q[f].rotation = 90) : (l.x = a - 100, l.rotation = -90, q[f].x = a - 150, q[f].y = e +
            6, q[f].rotation = -90));
        s_oStage.addChild(l);
        s_oStage.addChild(q[f]);
        n = s_oSpriteLibrary.getSprite("cloud_uno");
        n = {
            images: [n],
            frames: {
                width: 261,
                height: 194,
                regX: 130.5,
                regY: 97
            },
            animations: {
                cloud1: [0],
                cloud2: [1]
            }
        };
        n = new createjs.SpriteSheet(n);
        m = new createjs.Sprite(n, "cloud1");
        m.alpha = 0;
        m.scaleX = .1;
        m.scaleY = .1
    };
    this.getGlobalPosition = function() {
        for (var a = 0, c = 0, d = 0; d < h.length; d++) 0 !== b ? a += CARD_WIDTH / 2 : c += CARD_HEIGHT / 2;
        return {
            x: k.x + a,
            y: k.y + c
        }
    };
    this.getContainerPos = function() {
        return {
            x: k.x,
            y: k.y
        }
    };
    this.getCardPositionByIndex = function(b) {
        b = h[b].getPos();
        return {
            x: b.x,
            y: b.y
        }
    };
    this.searchIndexCard = function(b) {
        for (var a = 0; a < h.length; a++)
            if (b === h[a]) return a
    };
    this.removeCardByIndex = function(b) {
        return h.splice(b, 1)
    };
    this.getPosNewCard = function() {
        return {
            x: h.length * b,
            y: h.length * g
        }
    };
    this.pushCard = function(b) {
        h.push(b);
        if (0 === g && e > CANVAS_HEIGHT / 2) h[h.length - 1].getCardSprite().on("mouseover", this.onMouseOver)
    };
    this.getContainer = function() {
        return k
    };
    this.getLastCard = function() {
        return h[h.length - 1]
    };
    this.getLength = function() {
        return h.length
    };
    this.centerContainer = function() {
        var a;
        a = k.getBounds();
        0 !== b ? createjs.Tween.get(k).to({
            x: CANVAS_WIDTH / 2 - a.width / 2 + CARD_WIDTH / 2
        }, 300, createjs.Ease.linear) : createjs.Tween.get(k).to({
            y: CANVAS_HEIGHT / 2 - a.height / 2 + CARD_HEIGHT / 1.5 - 40
        }, 300, createjs.Ease.linear)
    };
    this.setOnTop = function() {
        s_oStage.addChildAt(k, s_oStage.numChildren - 1)
    };
    this.setChildDepth = function(b) {
        b > k.s_oStage.numChild - 1 && (b = k.s_oStage.numChild - 1);
        s_oStage.addChildAt(b)
    };
    this.getContainerInfo = function() {
        return k.getBounds()
    };
    this.getCardByIndex = function(b) {
        return h[b]
    };
    this.organizeHand = function(a) {
        var c = this;
        if (0 !== b)
            for (var d = 0; d < h.length; d++) a = b * d, createjs.Tween.get(h[d].getSprite()).to({
                x: a
            }, 300, createjs.Ease.linear).call(c.centerContainer);
        else
            for (d = 0; d < h.length; d++) a = g * d, createjs.Tween.get(h[d].getSprite()).to({
                y: a
            }, 300, createjs.Ease.linear).call(function() {
                c.centerContainer()
            })
    };
    this.setOnTurn = function(b) {
        q[b].alpha = 1;
        l.gotoAndStop("on")
    };
    this.setOffTurn = function(b) {
        q[b].alpha = .15;
        l.gotoAndStop("off")
    };
    this.checkUno = function() {
        1 === h.length && (this.setOnTop(), 0 !== b ? e < CANVAS_HEIGHT / 2 ? (m.gotoAndStop("cloud2"), m.x = CANVAS_WIDTH / 2 - 270, m.y = CANVAS_HEIGHT / 2 - 300) : (m.gotoAndStop("cloud1"), m.x = CANVAS_WIDTH / 2 + 300, m.y = CANVAS_HEIGHT / 2 + 100) : a < CANVAS_WIDTH / 2 ? (m.gotoAndStop("cloud1"), m.x = CANVAS_WIDTH / 2 - 350, m.y = CANVAS_HEIGHT / 2 - 30) : (m.gotoAndStop("cloud2"), m.x = CANVAS_WIDTH / 2 + 350, m.y = CANVAS_HEIGHT / 2 - 200), s_oStage.addChild(m), (new createjs.Tween.get(m)).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1
        }, 300, createjs.Ease.bounceOut).wait(1500).to({
            scaleX: .1,
            scaleY: .1
        }, 300, createjs.Ease.cubicIn).to({
            alpha: 0
        }, 20).call(function() {
            s_oStage.removeChild(m)
        }))
    };
    this.getPointPlayer = function() {
        for (var b = 0, a = 0; a < h.length; a++) b += h[a].getRank() + 1;
        return b
    };
    this.onMouseOver = function(b) {
        s_bMobile || (b.target.cursor = "pointer")
    };
    this.init()
}

function CGame(c) {
    var d, a, e = null,
        f, b = [],
        g, h, k, l = !1,
        q, m, n, v, p, r;
    this._init = function() {
        d = 0;
        v = r = !1;
        h = new CTurnManager;
        q = new CAnimation;
        var b = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(b);
        a = new CInterface;
        new CPanelTutorial
    };
    this.startGame = function() {
        var a = {
                images: [s_oSpriteLibrary.getSprite("finger")],
                frames: {
                    width: 202,
                    height: 277,
                    regX: 101,
                    regY: 138.5
                },
                animations: {
                    idle: {
                        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        speed: .9
                    }
                }
            },
            a = new createjs.SpriteSheet(a);
        n = new createjs.Sprite(a, "idle");
        n.scaleX = .5;
        n.scaleY = .5;
        n.x = CANVAS_WIDTH / 2 - 90;
        n.y = CANVAS_HEIGHT / 2 - 100;
        for (a = 0; a < NUM_PLAYERS; a++) {
            var c = 0,
                d = 0;
            aHandPos["num_player_" + NUM_PLAYERS][a].x === CANVAS_WIDTH / 2 ? c = CARD_WIDTH / 2 : d = CARD_HEIGHT / 4;
            b[a] = new CHandDisplayer(c, d, aHandPos["num_player_" + NUM_PLAYERS][a].x, aHandPos["num_player_" + NUM_PLAYERS][a].y, a)
        }
        f = new CDeckDisplayer(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        g = new CDeckDisplayer(CANVAS_WIDTH / 2 + CARD_WIDTH, CANVAS_HEIGHT / 2);
        g.disableInputDraw();
        f.initializeDeck();
        f.shuffle();
        f.getContainer().on("mouseover", this.onMouseOverDeck);
        this.getFirstHand()
    };
    this.getFirstHand = function() {
        var a = f.takeLastCard(),
            c = h.checkTurn(),
            d = b[c].getContainerPos(),
            c = b[c].getPosNewCard(),
            e = f.getGlobalPosition();
        a.setOnTop();
        a.moveCardFirstHand(d.x + c.x - e.x, d.y + c.y - e.y, 250)
    };
    this.onCardDealed = function(a) {
        var c = h.checkTurn();
        b[c].pushCard(new CCard(b[c].getPosNewCard().x, b[c].getPosNewCard().y, b[c].getContainer(), a.getFotogram(), a.getRank(), a.getSuit()));
        a.unload();
        a = b[c].getLastCard();
        b[c].centerContainer();
        0 === c && a.showCard(0, "mute");
        h.nextTurn();
        b[b.length - 1].getLength() < STARTING_NUM_CARDS ? this.getFirstHand() : (f.setOnTop(), a = f.takeFirstLastCard(), a.moveFirstLastCard(CARD_WIDTH, 0, 600))
    };
    this.onFirstLastCardDealed = function(c) {
        var d;
        g.pushCard(new CCard(0, 0, g.getContainer(), c.getFotogram(), c.getRank(), c.getSuit()));
        c.unload();
        c = g.getLastCard();
        c.showCardNoInput();
        f.moveContainer(CANVAS_WIDTH / 2 - CARD_WIDTH / 2, CANVAS_HEIGHT / 2, 400);
        g.moveContainer(CANVAS_WIDTH / 2 + CARD_WIDTH / 2, CANVAS_HEIGHT / 2, 400);
        k = g.getLastCard().getSuit();
        a.refreshColor(k);
        h.setTurn(Math.floor(Math.random() * NUM_PLAYERS) + 0);
        d = h.checkTurn();
        b[d].setOnTurn(d);
        g.disableInputUsedCards();
        this.applyEffectOnCard(c, !0)
    };
    this.pickCard = function(a, c) {
        var d = g.getLastCard(),
            e = h.checkTurn(),
            f = b[e].getContainerPos(),
            t = g.getGlobalPosition();
        b[e].setOnTop();
        0 === e && (a.getRank() === d.getRank() && "draw_four" !== a.getFotogram() || a.getSuit() === k || "color" === a.getFotogram() ? (this.offInputPlayer(), a.moveCard(t.x - f.x, t.y - f.y, 300), playSound("card", 1), 2 === b[0].getLength() && (l = !0)) : 14 === a.getRank() && !0 === this.checkAvaiableDrawFour() && (this.offInputPlayer(), a.moveCard(t.x - f.x, t.y - f.y, 300), playSound("card", 1), 2 === b[0].getLength() && (l = !0)))
    };
    this.cpuPickCard = function(a) {
        var c = h.checkTurn(),
            d = b[c].getContainerPos(),
            e = g.getGlobalPosition();
        b[c].setOnTop();
        a.moveCard(e.x - d.x, e.y - d.y, 400, 1E3);
        f.setChildDepth(2);
        g.setChildDepth(2);
        a.showCard(1E3)
    };
    this.playedCard = function(c) {
        var d = h.checkTurn(),
            e = b[d].searchIndexCard(c);
        g.pushCard(new CCard(0, 0, g.getContainer(), c.getFotogram(), c.getRank(), c.getSuit()));
        g.disableInputUsedCards();
        g.getLastCard().instantShow();
        b[d].removeCardByIndex(e);
        c.unload();
        0 !== d && b[d].checkUno();
        4 !== g.getLastCard().getSuit() && (k = g.getLastCard().getSuit(), a.refreshColor(k));
        b[d].organizeHand(e);
        this.applyEffectOnCard(c)
    };
    this.applyEffectOnCard = function(b, c) {
        var d = this,
            e;
        c || (c = !1);
        !0 === c ? (m = h.checkTurn(), h.prevTurn(), e = h.checkTurn()) : (e = h.checkTurn(), m = h.checkNextPlayer());
        if ("color" === b.getFotogram()) 0 === e ? (!0 === l ? new CSelectColorPanel(b.getFotogram(), !0) : new CSelectColorPanel(b.getFotogram()), h.nextTurn()) : (k = this.onSelectColorCpu(e), h.nextTurn(), q.changeColor(k));
        else if ("draw_four" === b.getFotogram()) 0 === e ? !0 === l ? new CSelectColorPanel(b.getFotogram(), !0) : new CSelectColorPanel(b.getFotogram()) : (k = this.onSelectColorCpu(e), a.refreshColor(k), q.drawFourAnim());
        else if ("color" !== b.getFotogram() && "draw_four" !== b.getFotogram() && b.getSuit() === k || b.getRank() === g.getLastCard().getRank()) 10 === b.getRank() ? (h.nextTurn(), h.nextTurn(), !0 === l ? setTimeout(function() {
            !0 === l && d.drawCards(0, 2, 0, !0);
            setTimeout(function() {
                q.stopTurn()
            }, 800)
        }, 2E3) : q.stopTurn()) : 11 === b.getRank() ? (2 < NUM_PLAYERS ? (h.changeClockWise(), !0 !== c ? h.nextTurn() : h.prevTurn()) : (h.changeClockWise(), h.nextTurn(), h.nextTurn()), !0 === l ? setTimeout(function() {
            !0 === l && d.drawCards(0, 2, 0, !0);
            setTimeout(function() {
                q.changeClockWise(h.getClockWise())
            }, 800)
        }, 2E3) : q.changeClockWise(h.getClockWise())) : 12 === b.getRank() ? !0 === l ? setTimeout(function() {
            !0 === l && d.drawCards(0, 2, 0, !0);
            setTimeout(function() {
                q.drawTwoAnim()
            }, 800)
        }, 2E3) : q.drawTwoAnim() : 10 > b.getRank() && (!0 === l ? setTimeout(function() {
            !0 === l && d.drawCards(0, 2, 0, !0);
            setTimeout(function() {
                h.nextTurn();
                d.onNextTurn()
            }, 800)
        }, 2E3) : (h.nextTurn(), this.onNextTurn()))
    };
    this.onNextTurn = function() {
        if (!0 !== this.checkGameOver()) {
            this.setOffTurn();
            this.checkNumOfCards();
            f.enableInputDraw();
            var a = h.checkTurn();
            b[a].setOnTurn(a);
            var c, d = g.getLastCard();
            if (0 === a) this.onInputPlayer(), !0 === this.onCheckDraw() && this.checkHelpDraw();
            else if (0 !== a) {
                c = [];
                for (var e = 0; e < b[a].getLength(); e++) 4 === b[a].getCardByIndex(e).getSuit() || b[a].getCardByIndex(e).getRank() !== d.getRank() && b[a].getCardByIndex(e).getSuit() !== k ? "color" === b[a].getCardByIndex(e).getFotogram() ? c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 2
                }) : "draw_four" === b[a].getCardByIndex(e).getFotogram() && c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 1
                }) : 12 === b[a].getCardByIndex(e).getRank() ? c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 6
                }) : 10 === b[a].getCardByIndex(e).getRank() ? c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 5
                }) : 11 === b[a].getCardByIndex(e).getRank() ? c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 4
                }) : c.push({
                    oCard: b[a].getCardByIndex(e),
                    iValue: 3
                });
                0 === c.length ? this.drawCards(a, 1, 1E3) : (c.sort(function(b, a) {
                    return parseFloat(a.iValue) - parseFloat(b.iValue)
                }), this.cpuPickCard(c[0].oCard))
            }
        }
    };
    this.checkAvaiableDrawFour = function() {
        for (var a = !0, c, d = 0; d < b[0].getLength(); d++)
            if (c = b[0].getCardByIndex(d), c.getRank() === g.getLastCard().getRank() && "draw_four" !== c.getFotogram() || c.getSuit() === k || "color" === c.getFotogram()) a = !1;
        return a
    };
    this.declareUNO = function() {
        !0 === l && (l = !1, b[0].checkUno())
    };
    this.drawCards = function(a, c, d, e) {
        var m = this,
            q, u, t, n, p, r;
        f.setOnTop();
        1 === c && (q = g.getLastCard(), u, t = f.takeLastCard(), t.setOnTop(), n = b[a].getContainerPos(), p = b[a].getPosNewCard(), r = f.getGlobalPosition(), (new createjs.Tween.get(t.getSprite())).wait(d).to({
            x: n.x + p.x - r.x,
            y: n.y + p.y - r.y
        }, 400, createjs.Ease.cubicOut).call(function() {
            b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
            t.unload();
            u = b[a].getLastCard();
            0 === a ? (u.showCard(), u.onSetTurned()) : playSound("card", 1);
            b[a].centerContainer();
            u.getRank() === q.getRank() || u.getSuit() === k || "color" === u.getFotogram() || "draw_four" === u.getFotogram() ? 0 !== a && (m.onNextTurn(), playSound("card", 1)) : (b[a].centerContainer(), h.nextTurn(), m.onNextTurn())
        }));
        2 === c && (t = f.takeLastCard(), t.setOnTop(), n = b[a].getContainerPos(), p = b[a].getPosNewCard(), r = f.getGlobalPosition(), f.getIndexChild(), (new createjs.Tween.get(t.getSprite())).wait(d).to({
            x: n.x + p.x - r.x,
            y: n.y + p.y - r.y
        }, 400, createjs.Ease.cubicOut).call(function() {
            b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
            t.unload();
            0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
            b[a].centerContainer()
        }).call(function() {
            t = f.takeLastCard();
            n = b[a].getContainerPos();
            p = b[a].getPosNewCard();
            r = f.getGlobalPosition();
            f.getIndexChild();
            (new createjs.Tween.get(t.getSprite())).to({
                x: n.x + p.x - r.x,
                y: n.y + p.y - r.y
            }, 400, createjs.Ease.cubicOut).call(function() {
                b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
                t.unload();
                0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
                b[a].centerContainer();
                e ? l = !1 : (h.nextTurn(), h.nextTurn(), m.onNextTurn())
            })
        }));
        4 === c && (t = f.takeLastCard(), t.setOnTop(), n = b[a].getContainerPos(), p = b[a].getPosNewCard(), r = f.getGlobalPosition(), f.getIndexChild(), (new createjs.Tween.get(t.getSprite())).wait(d).to({
            x: n.x + p.x - r.x,
            y: n.y + p.y - r.y
        }, 400, createjs.Ease.cubicOut).call(function() {
            b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
            t.unload();
            0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
            b[a].centerContainer()
        }).call(function() {
            t = f.takeLastCard();
            n = b[a].getContainerPos();
            p = b[a].getPosNewCard();
            r = f.getGlobalPosition();
            f.getIndexChild();
            (new createjs.Tween.get(t.getSprite())).to({
                x: n.x + p.x - r.x,
                y: n.y + p.y - r.y
            }, 400, createjs.Ease.cubicOut).call(function() {
                b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
                t.unload();
                0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
                b[a].centerContainer()
            }).call(function() {
                a = h.checkNextPlayer();
                t = f.takeLastCard();
                t.setOnTop();
                n = b[a].getContainerPos();
                p = b[a].getPosNewCard();
                r = f.getGlobalPosition();
                f.getIndexChild();
                (new createjs.Tween.get(t.getSprite())).to({
                    x: n.x + p.x - r.x,
                    y: n.y + p.y - r.y
                }, 400, createjs.Ease.cubicOut).call(function() {
                    b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
                    t.unload();
                    0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
                    b[a].centerContainer()
                }).call(function() {
                    t = f.takeLastCard();
                    n = b[a].getContainerPos();
                    p = b[a].getPosNewCard();
                    r = f.getGlobalPosition();
                    f.getIndexChild();
                    (new createjs.Tween.get(t.getSprite())).to({
                        x: n.x + p.x - r.x,
                        y: n.y + p.y - r.y
                    }, 400, createjs.Ease.cubicOut).call(function() {
                        b[a].pushCard(new CCard(b[a].getPosNewCard().x, b[a].getPosNewCard().y, b[a].getContainer(), t.getFotogram(), t.getRank(), t.getSuit()));
                        t.unload();
                        0 === a ? (u = b[a].getLastCard(), u.showCard()) : playSound("card", 1);
                        b[a].centerContainer();
                        h.nextTurn();
                        h.nextTurn();
                        m.onNextTurn()
                    })
                })
            })
        }))
    };
    this.onDraw = function() {
        f.disableInputDraw();
        v = !1;
        s_oStage.removeChild(n);
        var a = !0,
            c;
        if (0 !== g.getLength() && 0 === h.checkTurn()) {
            for (var d = 0; d < b[0].getLength(); d++)
                if (c = b[0].getCardByIndex(d), c.getRank() === g.getLastCard().getRank() || c.getSuit() === k || "color" === c.getFotogram() || "draw_four" === c.getFotogram()) a = !1;
                !0 === a && (this.drawCards(0, 1), r = !1)
        }
    };
    this.onCheckDraw = function() {
        var a = !0;
        v = !0;
        var c;
        if (0 !== g.getLength() && 0 === h.checkTurn()) {
            for (var d = 0; d < b[0].getLength(); d++)
                if (c = b[0].getCardByIndex(d), c.getRank() === g.getLastCard().getRank() || c.getSuit() === k || "color" === c.getFotogram() || "draw_four" === c.getFotogram()) v = a = !1;
            r = !0 === v && 0 === h.checkTurn() ? !0 : !1;
            return a
        }
    };
    this.onSelectColor = function(b) {
        k = b;
        a.refreshColor(k)
    };
    this.onInputPlayer = function() {
        for (var a = 0; a < b[0].getLength(); a++) b[0].getCardByIndex(a).onSetTurned()
    };
    this.offInputPlayer = function() {
        for (var a = 0; a < b[0].getLength(); a++) b[0].getCardByIndex(a).offSetTurned()
    };
    this.onSelectColorCpu = function(a) {
        for (var c, d = [{
            iColor: 0,
            iPoints: 0
        }, {
            iColor: 1,
            iPoints: 0
        }, {
            iColor: 2,
            iPoints: 0
        }, {
            iColor: 3,
            iPoints: 0
        }], e = 0; e < b[a].getLength(); e++) {
            c = b[a].getCardByIndex(e);
            for (var f = 0; f < d.length; f++) c.getSuit() === f && d[f].iPoints++
        }
        d.sort(function(a, b) {
            return parseFloat(b.iPoints) - parseFloat(a.iPoints)
        });
        return d[0].iColor
    };
    this.onEndDrawFour = function() {
        this.drawCards(m, 4, 0)
    };
    this.onEndDrawTwo = function() {
        this.drawCards(m, 2, 0)
    };
    this.getbUNO = function() {
        return l
    };
    this.checkGameOver = function() {
        var a = !1;
        0 === b[0].getLength() && (this.gameOver(0), a = !0);
        0 === b[1].getLength() && (this.gameOver(1), a = !0);
        b[2] && 0 === b[2].getLength() && (this.gameOver(2), a = !0);
        b[3] && 0 === b[3].getLength() && (this.gameOver(3), a = !0);
        return a
    };
    this.setOffTurn = function() {
        for (var a = 0; a < NUM_PLAYERS; a++) b[a].setOffTurn(a)
    };
    this.checkNumOfCards = function() {
        var a;
        5 >= f.getLength() && (a = g.removeAllCardUnderTheDeck(), this.shuffle(a), f.addNewCardUnderTheDeck(a))
    };
    this.shuffle = function(a) {
        var b, c, d;
        for (d = a.length; d; d--) b = Math.floor(Math.random() * d), c = a[d - 1], a[d - 1] = a[b], a[b] = c
    };
    this.unload = function() {
        null !== e && e.unload();
        v = !1;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    };
    this.onExit = function() {
        $(s_oMain).trigger("end_session");
        s_oGame.unload();
        s_oMain.gotoMenu()
    };
    this.stopFinger = function() {
        !0 === v && (v = !1)
    };
    this.startFinger = function() {
        !0 === this.onCheckDraw() && s_oStage.addChild(n)
    };
    this.gameOver = function(a) {
        var c;
        p = new createjs.Shape;
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        p.alpha = 0;
        p.on("mousedown", function() {});
        s_oStage.addChild(p);
        (new createjs.Tween.get(p)).to({
            alpha: .7
        }, 500);
        for (var f = 0; f < NUM_PLAYERS - 1; f++) c = f + 1, "undefined" !== b[c] && (d += b[c].getPointPlayer());
        e = CEndPanel(s_oSpriteLibrary.getSprite("credits_panel"));
        e.show(d, a)
    };
    this.checkHelpDraw = function() {
        setTimeout(function() {
            !0 === v && s_oStage.addChildAt(n, s_oStage.numChildren)
        }, 5E3)
    };
    this.onMouseOverDeck = function(a) {
        s_bMobile || (a.target.cursor = !0 === r ? "pointer" : "default")
    };
    this.update = function() {};
    s_oGame = this;
    STARTING_NUM_CARDS = c.starting_num_cards;
    this._init()
}
var s_oGame;

function CInterface() {
    var c, d, a, e, f, b, g, h, k, l, q, m, n, v, p = null,
        r = null,
        t;
    this._init = function() {
        var u = s_oSpriteLibrary.getSprite("but_exit");
        g = CANVAS_WIDTH - u.height / 2 - 10;
        h = u.height / 2 + 10;
        m = new CGfxButton(g, h, u, s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = CANVAS_WIDTH - u.width / 2 - 100;
        b = u.height / 2 + 10;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) u = s_oSpriteLibrary.getSprite("audio_icon"), q = new CToggle(f, b, u, s_bAudioActive, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        var u = window.document,
            w = u.documentElement;
        p = w.requestFullscreen || w.mozRequestFullScreen || w.webkitRequestFullScreen || w.msRequestFullscreen;
        r = u.exitFullscreen || u.mozCancelFullScreen || u.webkitExitFullscreen || u.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (p = !1);
        p && !inIframe() && (u = s_oSpriteLibrary.getSprite("but_fullscreen"), a = u.width / 4 + 10, e = u.height / 2 + 10, n = new CToggle(a, e, u, s_bFullscreen, s_oStage), n.addEventListener(ON_MOUSE_UP, this._onFullscreen, this));
        u = s_oSpriteLibrary.getSprite("but_uno");
        c = CANVAS_WIDTH / 2 +
            222;
        d = CANVAS_HEIGHT / 2 + 70;
        t = new CGfxButton(c, d, u, s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onButUno, this);
        u = s_oSpriteLibrary.getSprite("colors");
        u = new createjs.SpriteSheet({
            images: [u],
            frames: {
                width: 103,
                height: 102,
                regX: 51.5,
                regY: 51
            },
            animations: {
                red: [0],
                green: [1],
                blue: [2],
                yellow: [3]
            }
        });
        k = CANVAS_WIDTH / 2 + 220;
        l = CANVAS_HEIGHT / 2 - 60;
        v = new createjs.Sprite(u, 0);
        v.stop();
        v.x = k;
        v.y = l;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.setButtonUno = function(a) {
        t.setClickable(a)
    };
    this.refreshColor = function(a) {
        v.gotoAndStop(a);
        s_oStage.addChildAt(v, 3)
    };
    this._onButUno = function() {
        s_oGame.declareUNO()
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q.unload(), q = null;
        m.unload();
        p && !inIframe() && n.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(c, d) {
        m.setPosition(g - c, d + h);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || q.setPosition(f - c, d + b);
        p && !inIframe() && n.setPosition(a + c, e + d)
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        new CAreYouSurePanel(s_oGame.onExit)
    };
    this._onFullscreen = function() {
        s_bFullscreen ? (r.call(window.document), s_bFullscreen = !1) : (p.call(window.document.documentElement), s_bFullscreen = !0);
        sizeHandler()
    };
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;

function CHelpPanel() {
    var c, d, a, e, f, b, g;
    this._init = function() {
        var g = this;
        f = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        var k = CANVAS_WIDTH / 2,
            l = CANVAS_HEIGHT / 2 - 200;
        d = new createjs.Text(TEXT_HELP1, " 24px Arial", "#000000");
        d.x = k + 2;
        d.y = l + 2;
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.lineWidth = 400;
        c = new createjs.Text(TEXT_HELP1, " 24px Arial", "#ffffff");
        c.x = k;
        c.y = l;
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.lineWidth = 400;
        k = CANVAS_WIDTH / 2 - 130;
        l = CANVAS_HEIGHT / 2 - 40;
        e = new createjs.Text(TEXT_HELP2, " 24px Arial", "#000000");
        e.x = k + 2;
        e.y = l + 2;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineWidth = 280;
        a = new createjs.Text(TEXT_HELP2, " 24px Arial", "#ffffff");
        a.x = k;
        a.y = l;
        a.textAlign = "center";
        a.textBaseline = "alphabetic";
        a.lineWidth = 280;
        b = new createjs.Container;
        b.addChild(f, d, c, e, a);
        b.alpha = 0;
        s_oStage.addChild(b);
        createjs.Tween.get(b).to({
            alpha: 1
        }, 700);
        b.on("pressup", function() {
            g._onExitHelp()
        })
    };
    this.unload = function() {
        s_oStage.removeChild(b);
        var a = this;
        b.off("pressup", function() {
            a._onExitHelp()
        })
    };
    this._onExitHelp = function() {
        g.unload();
        s_oGame._onExitHelp()
    };
    g = this;
    this._init()
}

function CCreditsPanel() {
    var c, d, a, e, f;
    this._init = function() {
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = 0;
        d.on("mousedown", function() {});
        s_oStage.addChild(d);
        (new createjs.Tween.get(d)).to({
            alpha: .7
        }, 500);
        a = new createjs.Container;
        s_oStage.addChild(a);
        var b = s_oSpriteLibrary.getSprite("credits_panel"),
            g = createBitmap(b);
        g.regX = b.width / 2;
        g.regY = b.height / 2;
        a.addChild(g);
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT + b.height / 2;
        c = a.y;
        (new createjs.Tween.get(a)).to({
            y: CANVAS_HEIGHT /
                2 - 40
        }, 500, createjs.Ease.quartIn);
        g = new createjs.Text("DEVELOPED BY", " 20px " + PRIMARY_FONT, "#ffffff");
        g.y = -b.height / 2 + 40;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 300;
        a.addChild(g);
        b = new createjs.Text("Published on KBHGames.com", " 30px " + PRIMARY_FONT, "#ffffff");
        b.y = 100;
        b.textAlign = "center";
        b.textBaseline = "middle";
        b.lineWidth = 500;
        a.addChild(b);
        b = s_oSpriteLibrary.getSprite("ctl_logo");
        f = createBitmap(b);
        f.on("mousedown", this._onLogoButRelease);
        f.regX = b.width / 2;
        f.regY = b.height / 2;
        a.addChild(f);
        b = s_oSpriteLibrary.getSprite("but_exit");
        e = new CGfxButton(230, -107, b, a);
        e.addEventListener(ON_MOUSE_UP, this.unload, this)
    };
    this.unload = function() {
        e.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(a)).to({
            y: c
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(d);
            s_oStage.removeChild(a);
            e.unload()
        });
        d.off("mousedown", function() {});
        f.off("mousedown", this._onLogoButRelease)
    };
    this._onLogoButRelease = function() {
         
    };
    this._onMoreGamesReleased = function() {
     
    };
    this._init()
}

function CSelectColorPanel(c, d) {
    var a, e, f, b, g = this,
        h, k, l, q;
    this._init = function() {
        "color" === c && playSound("special_card", .5);
        g = this;
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function() {});
        s_oStage.addChild(e);
        (new createjs.Tween.get(e, {
            override: !0
        })).to({
            alpha: .7
        }, 500);
        f = new createjs.Container;
        s_oStage.addChild(f);
        b = new createjs.Container;
        f.addChild(b);
        var d = s_oSpriteLibrary.getSprite("select_color_panel"),
            n = createBitmap(d);
        n.regX = d.width / 2;
        n.regY = d.height / 2;
        f.addChildAt(n, 0);
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT + d.height / 2;
        a = f.y;
        (new createjs.Tween.get(f, {
            override: !0
        })).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 600, createjs.Ease.backOut);
        n = new createjs.Text(TEXT_SELECT_COLOR, " 45px " + PRIMARY_FONT, "#ffffff");
        n.y = -d.height / 2 + 90;
        n.textAlign = "center";
        n.textBaseline = "middle";
        n.lineWidth = 400;
        f.addChild(n);
        b.y = f.getBounds().height / 5;
        d = s_oSpriteLibrary.getSprite("but_red");
        h = new CGfxButton(-190, -20, d, b);
        h.addEventListener(ON_MOUSE_UP, function() {
            g.onSelectColor(0);
            b
        });
        d = s_oSpriteLibrary.getSprite("but_green");
        k = new CGfxButton(-65, -20, d, b);
        k.addEventListener(ON_MOUSE_UP, function() {
            g.onSelectColor(1);
            b
        });
        d = s_oSpriteLibrary.getSprite("but_blue");
        l = new CGfxButton(65, -20, d, b);
        l.addEventListener(ON_MOUSE_UP, function() {
            g.onSelectColor(2);
            b
        });
        d = s_oSpriteLibrary.getSprite("but_yellow");
        q = new CGfxButton(190, -20, d, b);
        q.addEventListener(ON_MOUSE_UP, function() {
            g.onSelectColor(3);
            b
        })
    };
    this.onSelectColor = function(a) {
        s_oGame.onSelectColor(a);
        g.unload()
    };
    this.unload = function() {
        "color" === c ? ((new createjs.Tween.get(e, {
            override: !0
        })).to({
            alpha: 0
        }, 500), (new createjs.Tween.get(f, {
            override: !0
        })).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(e, {
                override: !0
            });
            s_oStage.removeChild(f, {
                override: !0
            });
            if (d) setTimeout(function() {
                !0 === s_oGame.getbUNO() && s_oGame.drawCards(0, 2, 0, d);
                setTimeout(function() {
                    s_oGame.onNextTurn()
                }, 800)
            }, 2E3);
            else s_oGame.onNextTurn()
        })) : ((new createjs.Tween.get(e, {
            override: !0
        })).to({
            alpha: 0
        }, 500), (new createjs.Tween.get(f, {
            override: !0
        })).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(e);
            s_oStage.removeChild(f);
            d ? setTimeout(function() {
                !0 === s_oGame.getbUNO() && s_oGame.drawCards(0, 2, 0, d);
                setTimeout(function() {
                    s_oCAnimation.drawFourAnim()
                }, 800)
            }, 2E3) : s_oCAnimation.drawFourAnim()
        }));
        e.off("mousedown", function() {})
    };
    this._init()
}

function CAreYouSurePanel(c) {
    var d, a, e, f, b, g;
    this._init = function(c) {
        s_oGame.stopFinger();
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("mousedown", function() {});
        s_oStage.addChild(f);
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChildAt(b, s_oStage.numChildren);
        c = s_oSpriteLibrary.getSprite("credits_panel");
        var g = createBitmap(c);
        g.regX = c.width / 2;
        g.regY = c.height / 2;
        b.addChild(g);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT +
            c.height / 2;
        d = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn).call(function() {
            createjs.Ticker.paused = !0
        });
        g = new createjs.Text(TEXT_ARE_SURE, " 44px " + PRIMARY_FONT, "#000000");
        g.y = -c.height / 2 + 95;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 400;
        g.outline = 5;
        b.addChild(g);
        c = new createjs.Text(TEXT_ARE_SURE, " 44px " + PRIMARY_FONT, "#FFFFFF");
        c.y = g.y;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.lineWidth = 400;
        b.addChild(c);
        a = new CGfxButton(110, 80, s_oSpriteLibrary.getSprite("but_yes_big"), b);
        a.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        e = new CGfxButton(-110, 80, s_oSpriteLibrary.getSprite("but_exit_big"), b);
        e.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this._onButYes = function() {
        e.setClickable(!1);
        a.setClickable(!1);
        createjs.Ticker.paused = !1;
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: d
        }, 400, createjs.Ease.backIn).call(function() {
            g.unload();
            c()
        })
    };
    this._onButNo = function() {
        createjs.Ticker.paused = !1;
        e.setClickable(!1);
        a.setClickable(!1);
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: d
        }, 400, createjs.Ease.backIn).call(function() {
            g.unload()
        })
    };
    this.unload = function() {
        e.unload();
        a.unload();
        s_oStage.removeChild(f);
        s_oStage.removeChild(b);
        f.off("mousedown", function() {});
        s_oGame.startFinger()
    };
    g = this;
    this._init(c)
}

function CEndPanel(c) {
    var d, a, e, f, b, g, h;
    this._init = function(c) {
        d = createBitmap(c);
        c = d.getBounds();
        d.regX = c.width / 2;
        d.regY = c.height / 2;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        e = new createjs.Text("", " 50px " + PRIMARY_FONT, "#000");
        e.x = CANVAS_WIDTH / 2 + 1;
        e.y = CANVAS_HEIGHT / 2 - 30;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineWidth = 550;
        f = new createjs.Text("", " 50px " + PRIMARY_FONT, "#ffffff");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 28;
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.lineWidth = 550;
        b = new createjs.Text("", " 35px " + PRIMARY_FONT, "#000");
        b.x = CANVAS_WIDTH / 2 + 1;
        b.y = CANVAS_HEIGHT / 2 + 120;
        b.textAlign = "center";
        b.textBaseline = "alphabetic";
        b.lineWidth = 550;
        g = new createjs.Text("", " 35px " + PRIMARY_FONT, "#ffffff");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 + 110;
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.lineWidth = 550;
        a = new createjs.Container;
        a.alpha = 0;
        a.visible = !1;
        a.addChild(d, b, g, e, f);
        s_oStage.addChild(a)
    };
    this.unload = function() {
        a.off("mousedown", this._onExit)
    };
    this._initListener = function() {
        a.on("mousedown", this._onExit)
    };
    this.show = function(c, d) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        h = c;
        var k = d + 1;
        0 === d ? (e.text = TEXT_GAMEOVER, f.text = TEXT_GAMEOVER, f.y = CANVAS_HEIGHT / 2 - 30, e.y = CANVAS_HEIGHT / 2 - 28) : (h = c = 0, e.text = TEXT_LOSE + k + TEXT_LOSE2, f.text = TEXT_LOSE + k + TEXT_LOSE2);
        b.text = TEXT_SCORE + ": " + c;
        g.text = TEXT_SCORE + ": " + c;
        a.visible = !0;
        var l = this;
        createjs.Tween.get(a).to({
            alpha: 1
        }, 500).call(function() {
            l._initListener()
        });
        $(s_oMain).trigger("save_score", c);
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session")
    };
    this._onExit = function() {
        var b = "You collected <strong>" + h + " points</strong>!<br><br>Share your score with your friends!",
            c = "My score is " + h + " points! Can you do better?";
        $(s_oMain).trigger("share_event", h, "200x200.jpg", "Congratulations!", b, c);
        a.off("mousedown", this._onExit);
        s_oStage.removeChild(a);
        s_oGame.unload();
        s_oMain.gotoMenu()
    };
    this._init(c);
    return this
};