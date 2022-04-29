/**
 * 1. Render song
 * 2. Play / pause / seek
 * 3.CD rotate + modified (not yet)
 * 4. Next / Prev song
 * 5. Random Song
 * 6. Next / repeat when ended
 * 7. Active song
 * 8. Scroll active song into view ( mobile app)
 * 9. play song when click choose
 * 10. Volume
 */


/**Bug chưa fix
 * 1. Moi khi next phai render lai (song > 30 giật trình duyệt)
 * ==> không render lại, add | remove class khi next (fixed by checkplaying())
 * 2. Chưa render đc thời lượng của mỗi bài hát khi trình duyệt
 * tải xong dữ liệu lúc đầu
 * 3. Trong lúc playing click vào song bị restart 
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const song_playing = $('.song-infor');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toogle-play');
const player = $('.container-content')
const progress = $('#progress');
const timeCurrentValue = $('.current-time');
const timeDurationValue = $('.duration-time')
const nextBtn = $('.btn-next');
const backBtn = $('.btn-back');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.songs-list');
const volume = $('#volume');
const inputForm = $('.search-input__item');
const form_Search = $('.form-search');





const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    isMuted: false,

    songs : [
        {
            name: 'BigCity Boy',
            singer: 'Binz',
            path: './assets/music/bigcityboy.mp3',
            image: './assets/music/music_img/bigcityboy.jpg',
    
        },
        {
            name: 'BlackJack',
            singer: 'Sobin ft Binz',
            path: './assets/music/blackjack.mp3',
            image: './assets/music/music_img/blackjack.jpg',
    
        },
        {
            name: 'Có Chàng Trai Viết Lên Cây',
            singer: 'Phan Mạnh Quỳnh',
            path: './assets/music/cochangtraivietlencay.mp3',
            image: './assets/music/music_img/cochangtraivietlencay.jpg',
    
        },
        {
            name: 'Người Lạ Ơi',
            singer: 'Karik',
            path: './assets/music/nguoilaoi.mp3',
            image: './assets/music/music_img/nguoilaoi.jpg',
    
        },
        {
            name: 'Hiện Đại',
            singer: 'Khắc Việt',
            path: './assets/music/hiendai.mp3',
            image: './assets/music/music_img/hiendai.jpg',
    
        },
        {
            name: 'Rồi Tới Luôn',
            singer: 'Nal',
            path: './assets/music/roitoiluon.mp3',
            image: './assets/music/music_img/roitoiluon.jpg',
    
        },
        {
            name: 'Sẽ Đi Cùng Nhau',
            singer: 'Soobin Hoàng Sơn ft Dalab',
            path: './assets/music/sedicungnhau.mp3',
            image: './assets/music/music_img/sedicungnhau.jpg',
    
        },
        {
            name: 'Thiên Đàng',
            singer: 'Wowy ft jolipoli',
            path: './assets/music/thiendang.mp3',
            image: './assets/music/music_img/thiendang.jpg',
    
        },
        {
            name: 'Từng Là Tất Cả',
            singer: 'Karik',
            path: './assets/music/tunglatatca.mp3',
            image: './assets/music/music_img/tunglatatca.jpg',
    
        },
        {
            name: 'Yêu',
            singer: 'Khắc Việt',
            path: './assets/music/yeu_khacviet.mp3',
            image: './assets/music/music_img/yeu_khacviet.jpg',
    
        },
        {
            name: 'Anh Là Của Em',
            singer: 'Karik',
            path: './assets/music/anhlacuaem.mp3',
            image: './assets/music/music_img/anhlacuaem.jpg',

        },
    ],
    render: function() {
        htmls = this.songs.map((song, index) => {
                return `<div class="songs-list__wrapper" data-index="${index}">
                <div class="songs-list__item">
                    <div class="song-infor">
                        <i class="song-infor__icon ti-music-alt"></i>
                        <div class="song-img__content btn-play">
                            <img src="${song.image}" alt="" class="song-infor_img size-40">
                            <img src="./assets/img/icon-playing.gif" alt="" class="icon-playing">
                        </div>
                        <div class="song-infor__singer">
                            <div class="song-name">${song.name}</div>
                            <div class="singer-name">${song.singer}</div>
                        </div>
                    </div>
                    <span class="song-time song-time-duration">3:40</span>
                    <div class="song-option">
                        <div class="song-option__icon song-btn-micro">
                            <i class="ti-microphone"></i>
                            <div class="song-btn-micro__desc">Phát cùng lời bài hát</div>
                        </div>
                        <div class="song-option__icon song-btn-heart">
                            <i class="ti-heart"></i>
                            <div class="song-btn-heart__desc">Thêm vào thư viện</div>
                        </div>
                        <div class="song-option__icon song-btn-more">
                            <i class="ti-more-alt"></i>
                            <div class="song-btn-more__desc">Khác</div>
                        </div>
                    </div>
                </div>
            </div>`
        })
        playList.innerHTML = htmls.join('')
    },

    // Dinh nghia ra cac Property
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        
        const _this = this;

        //CD thumb rotate animate
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],
            // Time option
            {
                duration: 5000, /*Tong thoi gian xoay 5s */
                iterations: Infinity /*So lan lap */
            })
        cdThumbAnimate.pause();

        // Xử lý khi click play/pause
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
                
            }else {
                audio.play();
            }
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
            $$('.songs-list__wrapper')[_this.currentIndex].classList.add('active');
        }
        // Khi song pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
            $('.songs-list__wrapper.active').classList.remove('active')

        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            const currentTime = audio.currentTime;
            const durationTime = audio.duration;
            const progressPercent = Math.floor(currentTime / durationTime * 100);
            
            if(durationTime) {
                progress.value = progressPercent;
            }
            _this.setTimer();
        }

        // Xu ly khi trinh duyet load xong data
        audio.onloadeddata = function() {
            _this.displayDuration();
        }


        // Xu ly khi tua bai hat
        progress.oninput = function(e) {
            const seekTime = (e.target.value) * audio.duration / 100;
            audio.currentTime = seekTime;
        }

        // Xu ly khi next bai hat
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();

            } else {

                _this.nextSong();
            }
            audio.play();
            
        }
        // Xu ly khi prev song
        backBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
        }

        // Xu ly random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom);
            
        }
        // Xu ly khi repeat song 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // XU ly khi song ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            }else {
                nextBtn.click();
            }
        }
        // xu ly mute
        // const volBtn = $('.btn-vol');
        // volBtn.onclick = function(){
        //     if(isMuted = false) {
        //         audio.defaultMuted= true;
        //         isMuted = true;
        //         volumeValue = 0;
        //         audio.load();
        //     } 
        //     if (isMuted = true) {
        //         audio.defaultMuted= false;
        //         isMuted = false;
        //         audio.volume = volumeValue;
        //         audio.load();
        //     }
        // }


        // Lang nge hanh vi click vao playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.songs-list__wrapper:not(.active)');
            const songNodeOtion = e.target.closest('.song-option__icon');
            if(songNode || songNodeOtion ) {
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index) /**dataset la thuoc tinh cua attribute data-index
                    la dang chuoi, convert sang Num */
                    _this.loadCurrentSong();
                    audio.play();
                    _this.checkPlaying();
                }
                if(songNodeOtion) {
                    alert('Chức năng sẽ sớm cập nhật trong phiên bản sắp tới !');
                }
            }
        }

        // Set volume cho audio 
        volume.oninput = function(e) {
            volumeValue = e.target.value;
            audio.volume = volumeValue;
            console.log(volumeValue)
        }


        // Show search history
        inputForm.onfocus = function() {
            form_Search.classList.add("is-collapse")
            console.log('focusing')
        }
        inputForm.onblur = function() {
            form_Search.classList.remove("is-collapse")

            console.log('miss focus')
        }
        
    },
    loadCurrentSong() {
        const song_name = $('.player-song-name');
        const singer_name = $('.player-singer-name');
        
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        song_name.textContent = this.currentSong.name;
        singer_name.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;
        audio.volume = Number(volume.getAttribute('value'));
        
    },
    // hien thi thoi gian hien tai cua audio
    setTimer: function() {
        setInterval(() => {
            var minuteCurrent = Math.floor(audio.currentTime/ 60);
            var secondCurrent = Math.floor(audio.currentTime%60);
            if(secondCurrent < 10) {
                secondCurrent = '0' + String(secondCurrent)
            }
            if(minuteCurrent < 10) {
                minuteCurrent = '0' + String(minuteCurrent)
            }
            timeCurrentValue.innerHTML = minuteCurrent + ':' + secondCurrent
        },100)
    },

    displayDuration: function() {
            var mins = Math.floor(audio.duration / 60);
            var secs = Math.floor(audio.duration % 60);
            if(secs < 10) {
                secs = '0' + String(secs)
            }
            if(mins < 10) {
                mins = '0' + String(mins)
            }
            timeDurationValue.innerHTML = mins + ':' + secs;
    },
    checkPlaying: function() {
        if($('.songs-list__wrapper.active')) {
            $('.songs-list__wrapper.active').classList.remove('active')
        }

            $$('.songs-list__wrapper')[this.currentIndex].classList.add('active');
        

    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.checkPlaying();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        this.checkPlaying();

    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.round(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.checkPlaying();
        this.loadCurrentSong();
    },
    start: function() {
        
        // ĐỊnh nghĩa các thuốc tính cho object
        this.defineProperties();
        
        
        // lắng nge và xử lý các sự kiện 
        this.handleEvents();
        
        // Render song list
        this.render();
        
        this.loadCurrentSong();
    }
}
app.start();