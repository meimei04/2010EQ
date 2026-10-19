/**
 * KỊCH BẢN TƯƠNG TÁC THIỆP CHÚC MỪNG 20/10
 * Bao gồm: Cánh hoa rơi, Bắn tim pháo hoa, Mở thư 3D gõ chữ tự động, Hộp quà may mắn, Nhạc nền
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DỮ LIỆU LỜI CHÚC THEO ĐỐI TƯỢNG ---
  const ROLE_DATA = {
    crush: {
      title: "Gửi vạn đoá hồng thắm tươi và những điều ngọt ngào nhất tới người phụ nữ tuyệt vời nhất trần đời!",
      recipient: "Em Yêu Của Anh 💖",
      message: "Nhân ngày 20/10, chúc em luôn luôn xinh đẹp, rạng rỡ như ánh dương ban mai. Cảm ơn em đã xuất hiện và mang đến cho thế giới của anh vô vàn ấm áp và nụ cười. Mong em mãi an yên, hạnh phúc bên anh nhé!",
      sender: "— Người luôn thương em thật nhiều —"
    },
    mom: {
      title: "Kính chúc Mẹ - Người phụ nữ vĩ đại nhất đời con một ngày 20/10 ngập tràn niềm vui và bình an!",
      recipient: "Mẹ Yêu Quý Của Con 🌹",
      message: "Mẹ ơi, cảm ơn Mẹ vì cả đời đã hy sinh, bao dung và luôn dành cho con những điều tốt đẹp nhất. Nhân ngày Phụ nữ Việt Nam 20/10, con chúc Mẹ luôn dồi dào sức khỏe, luôn vui cười và bình an. Con yêu Mẹ vô bờ bến!",
      sender: "— Con yêu của Mẹ —"
    },
    sister: {
      title: "Chúc chị/em gái một ngày 20/10 thật rực rỡ, nhận được thật nhiều quà và yêu thương!",
      recipient: "Chị / Em Gái Đáng Yêu 🎀",
      message: "Chúc cho người con gái đáng yêu nhất nhà một ngày 20/10 thật hạnh phúc! Chúc chị/em luôn tự tin tỏa sáng, học tập và công việc luôn suôn sẻ, ngày càng xinh đẹp và sớm tìm được chân ái của đời mình nha!",
      sender: "— Gia đình luôn bên bạn —"
    },
    teacher: {
      title: "Tri ân Cô giáo kính yêu nhân ngày Phụ nữ Việt Nam 20/10 với trọn vẹn lòng biết ơn sâu sắc!",
      recipient: "Cô Giáo Kính Yêu 🎓",
      message: "Kính chúc Cô luôn dồi dào sức khỏe, ngập tràn niềm vui và luôn giữ mãi ngọn lửa nhiệt huyết trong sự nghiệp trồng người cao quý. Cảm ơn Cô vì những bài học quý giá và sự ân cần dìu dắt chúng em nên người!",
      sender: "— Học trò kính chúc —"
    },
    friend: {
      title: "Chúc bạn một ngày 20/10 rực rỡ ngập tràn hoa, quà và những điều tuyệt vời nhất!",
      recipient: "Cô Bạn Tuyệt Vời 🌸",
      message: "Chúc bạn một ngày 20/10 ngập tràn nụ cười, nhận được một núi quà và hoa xinh xắn! Chúc bạn mãi tự tin, yêu đời, công việc thăng hoa và luôn là phiên bản hạnh phúc nhất của chính mình nhé!",
      sender: "— Người bạn thân thiết —"
    }
  };

  // Các lời chúc theo danh mục
  const WISH_CATEGORY = [
    "\"Chúc em luôn rạng rỡ như ánh bình minh, nụ cười luôn nở trên môi và mãi là đóa hoa thơm ngát giữa đời!\"",
    "\"Mong em luôn bình an trước giông bão, tìm thấy sự an nhiên trong từng khoảnh khắc giản đơn nhất!\"",
    "\"Chúc cho mọi dự định của bạn đều thành công rực rỡ, con đường phía trước luôn trải đầy hoa hồng và may mắn!\"",
    "\"Chúc em luôn được yêu thương, được trân trọng và hạnh phúc mỗi ngày không chỉ riêng ngày 20/10!\""
  ];

  // Phần thưởng hộp quà may mắn
  const GIFT_REWARDS = [
    "🎉 Bạn nhận được: '1 Ngày làm việc nhà thay nàng + Bữa tối lãng mạn do chàng tự nấu'!",
    "🧋 Bạn nhận được: '1 Ly Trà Sữa Full Topping siêu ngon freeship tận nơi'!",
    "👑 Bạn nhận được: '1 Chiếc vé miễn làm mọi việc + Quyền lực Nữ hoàng trọn vẹn ngày 20/10'!",
    "✨ Bạn nhận được: '1000 Điều ước thành hiện thực + Mãi luôn xinh tươi, rạng ngời'!"
  ];

  // --- DOM ELEMENTS ---
  const recipientRole = document.getElementById('recipientRole');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const recipientDisplay = document.getElementById('recipientDisplay');
  const typewriterText = document.getElementById('typewriterText');
  const senderDisplay = document.getElementById('senderDisplay');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const heartSeal = document.getElementById('heartSeal');
  const btnOpenLetter = document.getElementById('btnOpenLetter');
  const btnSurpriseBox = document.getElementById('btnSurpriseBox');
  const bouquetContainer = document.getElementById('bouquetContainer');

  // Customizer Modal
  const btnCustom = document.getElementById('btnCustom');
  const customModal = document.getElementById('customModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnSaveCustom = document.getElementById('btnSaveCustom');
  const btnResetCustom = document.getElementById('btnResetCustom');
  const inputRecipient = document.getElementById('inputRecipient');
  const inputSender = document.getElementById('inputSender');
  const inputMessage = document.getElementById('inputMessage');

  // Music Controller
  const musicController = document.getElementById('musicController');
  const vinylDisc = document.getElementById('vinylDisc');
  const musicState = document.getElementById('musicState');
  const musicIcon = document.getElementById('musicIcon');

  // Wish tabs & Copy
  const wishTabs = document.querySelectorAll('.wish-tab');
  const wishContentBox = document.getElementById('wishContentBox');
  const btnCopyWish = document.getElementById('btnCopyWish');
  const toast = document.getElementById('toastNotification');

  // Gift boxes
  const giftItems = document.querySelectorAll('.gift-item');
  const giftResult = document.getElementById('giftResult');

  // Heart burst spam
  const btnSendHeartSpam = document.getElementById('btnSendHeartSpam');
  const heartCount = document.getElementById('heartCount');

  let currentHeartNum = 520;
  let isMusicPlaying = false;
  let typewriterInterval = null;

  // --- KHỞI TẠO NỘI DUNG MẶC ĐỊNH ---
  function updateRoleContent(roleKey) {
    const data = ROLE_DATA[roleKey] || ROLE_DATA.crush;
    heroSubtitle.textContent = data.title;
    recipientDisplay.textContent = data.recipient;
    senderDisplay.textContent = data.sender;
    typewriterEffect(data.message);

    inputRecipient.value = data.recipient;
    inputSender.value = data.sender;
    inputMessage.value = data.message;
  }

  // Hiệu ứng máy gõ chữ cho bức thư
  function typewriterEffect(text) {
    if (typewriterInterval) clearInterval(typewriterInterval);
    typewriterText.textContent = '';
    let index = 0;
    typewriterInterval = setInterval(() => {
      if (index < text.length) {
        typewriterText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 28);
  }

  // Mở phong thư
  function openEnvelope() {
    if (!envelopeWrapper.classList.contains('open')) {
      envelopeWrapper.classList.add('open');
      if (window.bgMusic) window.bgMusic.playEnvelopeOpen();
      showToast("💌 Phong thư đã được mở!");
      // Khởi động nhạc nếu chưa phát
      startMusicAuto();
    }
  }

  // --- SỰ KIỆN TƯƠNG TÁC ---
  recipientRole.addEventListener('change', (e) => {
    updateRoleContent(e.target.value);
    showToast("Đã cập nhật lời chúc cho " + e.target.options[e.target.selectedIndex].text);
  });

  heartSeal.addEventListener('click', openEnvelope);
  btnOpenLetter.addEventListener('click', () => {
    openEnvelope();
    envelopeWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  btnSurpriseBox.addEventListener('click', () => {
    const giftSection = document.getElementById('giftBoxSection');
    if (giftSection) {
      giftSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast("🎁 Hãy chọn một hộp quà may mắn nhé!");
    }
  });

  // Tương tác Bó hoa
  bouquetContainer.addEventListener('click', (e) => {
    if (window.bgMusic) {
      window.bgMusic.playSparkleChime();
      startMusicAuto();
    }
    // Bung nở tim và hiệu ứng pháo hoa từ bó hoa
    const rect = bouquetContainer.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 3);
    showToast("🌹 Đóa hoa bừng nở tình yêu thương!");
  });

  // Tùy chỉnh Modal
  btnCustom.addEventListener('click', () => {
    customModal.classList.add('active');
  });

  btnCloseModal.addEventListener('click', () => {
    customModal.classList.remove('active');
  });

  btnSaveCustom.addEventListener('click', () => {
    const customRec = inputRecipient.value.trim() || "Người Phụ Nữ Tuyệt Vời";
    const customSend = inputSender.value.trim() || "— Người luôn yêu thương bạn —";
    const customMsg = inputMessage.value.trim() || "Chúc bạn một ngày 20/10 ngập tràn niềm vui!";

    recipientDisplay.textContent = customRec;
    senderDisplay.textContent = customSend;
    typewriterEffect(customMsg);

    customModal.classList.remove('active');
    openEnvelope();
    showToast("✨ Đã lưu lời chúc riêng của bạn!");
  });

  btnResetCustom.addEventListener('click', () => {
    updateRoleContent(recipientRole.value);
    customModal.classList.remove('active');
    showToast("Đã khôi phục lời chúc mặc định!");
  });

  // Tabs lời chúc
  wishTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      wishTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const idx = parseInt(tab.getAttribute('data-tab'));
      wishContentBox.textContent = WISH_CATEGORY[idx] || WISH_CATEGORY[0];
      if (window.bgMusic) window.bgMusic.playHeartPop();
    });
  });

  // Copy lời chúc
  btnCopyWish.addEventListener('click', () => {
    const text = wishContentBox.textContent.replace(/"/g, '');
    navigator.clipboard.writeText(text).then(() => {
      showToast("📋 Đã sao chép lời chúc vào khay nhớ tạm!");
    }).catch(() => {
      showToast("Không thể sao chép, bạn hãy bôi đen để copy nhé!");
    });
  });

  // Hộp quà may mắn
  giftItems.forEach((box) => {
    box.addEventListener('click', () => {
      const id = parseInt(box.getAttribute('data-id')) - 1;
      giftItems.forEach(b => b.classList.remove('opened'));
      box.classList.add('opened');

      giftResult.textContent = GIFT_REWARDS[id] || GIFT_REWARDS[0];
      if (window.bgMusic) window.bgMusic.playSparkleChime();
      
      const rect = box.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });

  // Thả tim spam
  btnSendHeartSpam.addEventListener('click', (e) => {
    currentHeartNum += 10;
    heartCount.textContent = currentHeartNum;
    if (window.bgMusic) window.bgMusic.playHeartPop();
    
    const rect = btnSendHeartSpam.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top);
  });

  // Điều khiển âm nhạc
  function toggleMusic() {
    if (window.bgMusic) {
      const playing = window.bgMusic.toggle();
      isMusicPlaying = playing;
      if (playing) {
        vinylDisc.classList.remove('paused');
        musicState.textContent = 'Đang phát';
        musicIcon.textContent = '🔊';
      } else {
        vinylDisc.classList.add('paused');
        musicState.textContent = 'Tạm dừng';
        musicIcon.textContent = '🔈';
      }
    }
  }

  function startMusicAuto() {
    if (!isMusicPlaying && window.bgMusic) {
      window.bgMusic.start();
      isMusicPlaying = true;
      vinylDisc.classList.remove('paused');
      musicState.textContent = 'Đang phát';
      musicIcon.textContent = '🔊';
    }
  }

  musicController.addEventListener('click', toggleMusic);

  // Khởi động âm nhạc khi người dùng tương tác lần đầu
  document.body.addEventListener('click', () => {
    if (!isMusicPlaying) startMusicAuto();
  }, { once: true });

  // Toast thông báo
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Khởi chạy mặc định
  updateRoleContent('crush');
  vinylDisc.classList.add('paused');
  musicState.textContent = 'Chạm để phát';

  // --- CANVAS 1: HIỆU ỨNG CÁNH HOA ĐÀO & HOA HỒNG RƠI ---
  initPetalCanvas();

  // --- CANVAS 2: PHÁO HOA TRÁI TIM KHI CHẠM BẤT KỲ ĐÂU ---
  initFireworkCanvas();
});

// ==========================================
// CANVAS CÁNH HOA RƠI LÃNG MẠN
// ==========================================
function initPetalCanvas() {
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL_PETALS = 40;

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20 - Math.random() * 50;
      this.size = 10 + Math.random() * 14;
      this.speedY = 1 + Math.random() * 2;
      this.speedX = -1 + Math.random() * 2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = -2 + Math.random() * 4;
      this.opacity = 0.5 + Math.random() * 0.45;
      this.color = Math.random() > 0.4 ? '#ff758f' : '#ffb3c6';
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.015) + this.speedX * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      // Vẽ hình cánh hoa mềm mại
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    const p = new Petal();
    p.y = Math.random() * height; // Phân bổ đều ban đầu
    petals.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================
// CANVAS PHÁO HOA TRÁI TIM & ÁNH SAO (CLICK BẤT KỲ ĐÂU)
// ==========================================
let createBurst = null;

function initFireworkCanvas() {
  const canvas = document.getElementById('fireworkCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];

  class HeartParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = 12 + Math.random() * 12;
      this.alpha = 1;
      this.decay = 0.015 + Math.random() * 0.02;
      this.rotation = Math.random() * Math.PI;
      this.colors = ['#ff4d6d', '#ff758f', '#ffb703', '#ff0054', '#fb6f92'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.isHeart = Math.random() > 0.3; // 70% là trái tim, 30% là tia sáng
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08; // Trọng lực nhẹ
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);

      if (this.isHeart) {
        // Vẽ icon trái tim
        ctx.scale(this.size / 24, this.size / 24);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-12, -12, -24, 6, 0, 20);
        ctx.bezierCurveTo(24, 6, 12, -12, 0, 0);
        ctx.fill();
      } else {
        // Ngôi sao lấp lánh
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  createBurst = function(x, y) {
    const count = 22;
    for (let i = 0; i < count; i++) {
      particles.push(new HeartParticle(x, y));
    }
  };

  // Click trên màn hình tạo hiệu ứng bắn tim
  window.addEventListener('click', (e) => {
    // Tránh click trên modal
    if (e.target.closest('.modal-card')) return;
    createBurst(e.clientX, e.clientY);
  });

  function animLoop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animLoop);
  }
  animLoop();
}
