const players = [
  {
    name: "Bukayo Saka",
    number: 7,
    position: "Right Winger",
    image: "image/saka.jpg",
    description:
      "Bukayo Saka has become one of Arsenal's most important players. The England international is known for his dribbling, creativity, and goal-scoring ability.",
    stats: {
      appearances: 178,
      goals: 43,
      assists: 45,
      nationality: "England",
    },
  },
  {
    name: "William Saliba",
    number: 2,
    position: "Center Back",
    image: "image/saliba.jpg",
    description:
      "William Saliba has established himself as a key defender for Arsenal. The French international brings composure and strength to the backline.",
    stats: {
      appearances: 58,
      goals: 3,
      cleanSheets: 24,
      nationality: "France",
    },
  },
  {
    name: "Martin Ødegaard",
    number: 8,
    position: "Attacking Midfielder",
    image: "image/odegard.jpg",
    description:
      "Martin Ødegaard is Arsenal's captain and creative maestro. The Norwegian playmaker is known for his vision, passing, and leadership on the pitch.",
    stats: {
      appearances: 127,
      goals: 28,
      assists: 18,
      nationality: "Norway",
    },
  },
  {
    name: "Declan Rice",
    number: 41,
    position: "Defensive Midfielder",
    image: "image/rice.jpg",
    description:
      "Declan Rice joined Arsenal for a club-record fee in 2023. The England international brings steel, leadership, and passing range to the midfield.",
    stats: {
      appearances: 42,
      goals: 5,
      assists: 7,
      nationality: "England",
    },
  },
];

let currentSlide = 0;
const carouselTrack = document.getElementById("carouselTrack");
const carouselIndicators = document.getElementById("carouselIndicators");

function initCarousel() {
  carouselTrack.innerHTML = "";
  carouselIndicators.innerHTML = "";

  players.forEach((player, index) => {
    const slide = document.createElement("div");
    slide.className = "player-slide";
    slide.innerHTML = `
                    <div class="player-image" style="background-image: url('${
                      player.image
                    }')"></div>
                    <div class="player-info">
                        <h3>${player.name} ${
                          player.number ? `#${player.number}` : ""
                        }</h3>
                        <p>${player.description}</p>
                        <div class="player-stats">
                            <div class="stat-item">
                                <span class="stat-label">Position</span>
                                <span class="stat-value">${
                                  player.position
                                }</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Appearances</span>
                                <span class="stat-value">${
                                  player.stats.appearances
                                }</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Goals</span>
                                <span class="stat-value">${
                                  player.stats.goals || "N/A"
                                }</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Nationality</span>
                                <span class="stat-value">${
                                  player.stats.nationality ||
                                  player.stats.location
                                }</span>
                            </div>
                        </div>
                    </div>
                `;
    carouselTrack.appendChild(slide);

    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
    carouselIndicators.appendChild(indicator);
  });

  startAutoRotation();
}

function goToSlide(index) {
  currentSlide = index;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll(".indicator").forEach((ind, i) => {
    if (i === index) {
      ind.classList.add("active");
    } else {
      ind.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % players.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + players.length) % players.length;
  goToSlide(currentSlide);
}

let rotationInterval;
function startAutoRotation() {
  clearInterval(rotationInterval);
  rotationInterval = setInterval(nextSlide, 5000);
}

function showPage(pageId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  document.querySelectorAll("nav button").forEach((button) => {
    button.classList.remove("active");
  });
  document
    .querySelector(`nav button[data-route="${pageId}"]`)
    .classList.add("active");

  document.getElementById("nav").classList.remove("open");

  const footer = document.getElementById("mainFooter");
  if (pageId === "home") {
    footer.style.display = "block";
  } else {
    footer.style.display = "none";
  }

  if (pageId === "all" || pageId === "fav") {
    loadPosts();
  }
}

document.querySelectorAll("nav button").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.route);
  });
});

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
  const icon = this.querySelector("i");
  if (document.body.classList.contains("light-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

let posts = [
  {
    id: 1,
    title: "Bukayo Saka Extends Contract",
    category: "Team News",
    image: "image/saka.jpg",
    content:
      "Star winger Bukayo Saka has signed a new long-term contract with Arsenal, committing his future to the club he joined as an academy player.",
    date: "Jun 20, 2025",
    comments: [
      {
        id: 1,
        author: "James Wilson",
        content: "This is fantastic news! Saka is the future of our club.",
        date: "Jun 20, 2023",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        content: "Best news of the summer! He's going to be a legend.",
        date: "Jun 21, 2023",
      },
    ],
  },
  {
    id: 2,
    title: "Arteta's Tactical Revolution",
    category: "Analysis",
    image: "image/arteta.jpg",

    content:
      "An in-depth analysis of how Mikel Arteta has transformed Arsenal's playing style and brought the club back to Champions League football.",
    date: "July 18, 2025",

    comments: [
      {
        id: 1,
        author: "Michael Brown",
        content:
          "Arteta has completely changed the culture at the club. Amazing work!",
        date: "July 19, 2025",
      },
    ],
  },
  {
    id: 3,
    title: "Emirates Stadium Expansion Plans",
    category: "Club News",
    image: "image/emarets.jpg",

    content:
      "Arsenal have announced plans to expand Emirates Stadium capacity to 65,000, with new hospitality areas and improved fan facilities.",
    date: "Jun 12, 2025",

    comments: [],
  },
  {
    id: 4,
    title: "Arsenal Pre-Season Tour Announced",
    category: "Team News",
    image: "image/preseason.jpg",
    content:
      "Arsenal will tour the Singapor this summer with matches against top European clubs as part of their preparations for the new season.",
    date: "Jun 15, 2025",

    comments: [],
  },
  {
    id: 5,
    title: "Kai Havertz Signs for Arsenal",
    category: "Transfer News",
    image: "image/kiyhavert.jpg",
    content:
      "German international Kai Havertz has completed his move to Arsenal from Chelsea in a deal worth £65 million.",
    date: "Jun 28, 2023",

    comments: [],
  },
];

let favorites = [3, 5];
let currentPostId = null;
let currentCommentId = null;
let deleteTarget = null;
let currentGiveawayType = null;
let selectedTriviaOption = null;

function savePosts() {
  localStorage.setItem("arsenalPosts", JSON.stringify(posts));
  localStorage.setItem("arsenalFavorites", JSON.stringify(favorites));
}

function loadPosts() {
  const allPostsGrid = document.getElementById("allPostsGrid");
  const favoritesGrid = document.getElementById("favoritesGrid");

  if (allPostsGrid) {
    allPostsGrid.innerHTML = "";
    posts.forEach((post) => {
      const isFavorite = favorites.includes(post.id);
      allPostsGrid.appendChild(createPostCard(post, isFavorite, true));
    });
  }

  if (favoritesGrid) {
    favoritesGrid.innerHTML = "";
    const favoritePosts = posts.filter((post) => favorites.includes(post.id));

    if (favoritePosts.length === 0) {
      favoritesGrid.innerHTML = `
                        <div class="fav-empty">
                            <i class="fas fa-heart-broken"></i>
                            <h3>No Favorites Yet</h3>
                            <p>You haven't added any posts to your favorites. Browse our posts and click the heart icon to save your favorites.</p>
                        </div>
                    `;
    } else {
      favoritePosts.forEach((post) => {
        favoritesGrid.appendChild(createPostCard(post, true, false));
      });
    }
  }
}

function createPostCard(post, isFavorite, showEditDelete) {
  const card = document.createElement("div");
  card.className = "post-card";
  card.dataset.id = post.id;
  card.innerHTML = `
                <div class="post-image" style="background-image: url('${
                  post.image
                }');"></div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <div class="post-meta">
                        <span><i class="far fa-calendar"></i> ${
                          post.date
                        }</span>
                        <span><i class="far fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-tag"></i> ${post.category}</span>
                    </div>
                    <p>${post.content.substring(0, 150)}...</p>
                    <div class="post-actions">
                        <div class="post-controls">
                            <button class="action-btn fav-btn ${
                              isFavorite ? "favorited" : ""
                            }" data-id="${post.id}">
                                <i class="${
                                  isFavorite ? "fas" : "far"
                                } fa-heart"></i>
                            </button>
                            <button class="action-btn comment-btn" data-id="${
                              post.id
                            }">
                                <i class="far fa-comment"></i>
                            </button>
                            <button class="action-btn share-btn" data-id="${
                              post.id
                            }">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                        ${
                          showEditDelete ?
                            `
                        <div class="post-controls">
                            <button class="action-btn edit-btn" data-id="${post.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete-btn" data-id="${post.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        `
                          : ""
                        }
                    </div>
                </div>
            `;
  return card;
}

document.getElementById("addPostForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("postImage");
  const imagePreview = document.getElementById("imagePreview");

  let imageUrl =
    "https://images.unsplash.com/photo-1543326727-cf6f39a6f729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";

  if (imagePreview.src && imagePreview.src !== window.location.href) {
    imageUrl = imagePreview.src;
  }

  const newPost = {
    id: Date.now(),
    title: document.getElementById("postTitle").value,
    category: document.getElementById("postCategory").value,
    image: imageUrl,
    content: document.getElementById("postContent").value,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    author: "You",
    favorite: false,
    comments: [],
  };

  posts.unshift(newPost);
  savePosts();

  document.getElementById("successModal").classList.add("active");

  this.reset();
  document.getElementById("fileName").textContent = "No file selected";
  document.getElementById("imagePreview").style.display = "none";

  loadPosts();
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".edit-btn")) {
    const postId = parseInt(e.target.closest(".edit-btn").dataset.id);
    const post = posts.find((p) => p.id === postId);

    if (post) {
      currentPostId = postId;

      document.getElementById("editPostTitle").value = post.title;
      document.getElementById("editPostCategory").value = post.category;
      document.getElementById("editPostContent").value = post.content;

      const editImagePreview = document.getElementById("editImagePreview");
      editImagePreview.src = post.image;
      editImagePreview.style.display = "block";

      document.getElementById("editPostModal").classList.add("active");
    }
  }
});

document
  .getElementById("deleteInEditBtn")
  .addEventListener("click", function () {
    if (currentPostId) {
      document.getElementById("deleteModal").classList.add("active");
      document.getElementById("editPostModal").classList.remove("active");
    }
  });

document
  .getElementById("editPostForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!currentPostId) return;

    const post = posts.find((p) => p.id === currentPostId);
    if (!post) return;

    const fileInput = document.getElementById("editPostImage");
    const imagePreview = document.getElementById("editImagePreview");

    post.title = document.getElementById("editPostTitle").value;
    post.category = document.getElementById("editPostCategory").value;
    post.content = document.getElementById("editPostContent").value;

    if (imagePreview.src && imagePreview.src !== window.location.href) {
      post.image = imagePreview.src;
    }

    savePosts();
    loadPosts();

    const successModal = document.getElementById("successModal");
    successModal.querySelector(".modal-title").textContent =
      "Post Updated Successfully!";
    successModal.querySelector(".modal-text").textContent =
      "Your post has been successfully updated.";
    successModal.classList.add("active");

    document.getElementById("editPostModal").classList.remove("active");
  });

document.getElementById("cancelEditBtn").addEventListener("click", function () {
  document.getElementById("editPostModal").classList.remove("active");
});

document.getElementById("editPostClose").addEventListener("click", function () {
  document.getElementById("editPostModal").classList.remove("active");
});

window.addEventListener("click", function (e) {
  if (e.target === document.getElementById("editPostModal")) {
    document.getElementById("editPostModal").classList.remove("active");
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".fav-btn")) {
    const btn = e.target.closest(".fav-btn");
    const postId = parseInt(btn.dataset.id);

    if (favorites.includes(postId)) {
      favorites = favorites.filter((id) => id !== postId);
      btn.innerHTML = '<i class="far fa-heart"></i>';
      btn.classList.remove("favorited");
    } else {
      favorites.push(postId);
      btn.innerHTML = '<i class="fas fa-heart"></i>';
      btn.classList.add("favorited");
    }

    savePosts();

    if (document.getElementById("fav").classList.contains("active")) {
      loadPosts();
    }
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".share-btn")) {
    document.getElementById("shareModal").classList.add("active");
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".comment-btn")) {
    document.getElementById("commentsModal").classList.add("active");
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".delete-btn")) {
    const postId = parseInt(e.target.closest(".delete-btn").dataset.id);
    currentPostId = postId;
    document.getElementById("deleteModal").classList.add("active");
  }
});

document.getElementById("confirmDelete").addEventListener("click", function () {
  if (currentPostId) {
    posts = posts.filter((p) => p.id !== currentPostId);

    favorites = favorites.filter((id) => id !== currentPostId);

    savePosts();
    loadPosts();
    document.getElementById("deleteModal").classList.remove("active");
  }
});

document.getElementById("cancelDelete").addEventListener("click", function () {
  document.getElementById("deleteModal").classList.remove("active");
});

document.getElementById("searchBtn").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const allPostsGrid = document.getElementById("allPostsGrid");

  if (!allPostsGrid) return;

  allPostsGrid.innerHTML = "";

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm),
  );

  if (filteredPosts.length === 0) {
    allPostsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-xl);">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: var(--space-md); color: var(--arsenal-gold);"></i>
                        <h3>No Posts Found</h3>
                        <p>Try searching with different keywords</p>
                    </div>
                `;
  } else {
    filteredPosts.forEach((post) => {
      const isFavorite = favorites.includes(post.id);
      allPostsGrid.appendChild(createPostCard(post, isFavorite, true));
    });
  }
});

function enterGiveaway(type) {
  const modal = document.getElementById("giveawayModal");
  const title = document.getElementById("giveawayTitle");
  const icon = document.getElementById("giveawayIcon");
  const jerseyField = document.getElementById("jerseyNumberField");
  const matchField = document.getElementById("matchSelectionField");
  const triviaSection = document.getElementById("triviaSection");

  currentGiveawayType = type;

  if (type === "jersey") {
    title.textContent = "Custom Jersey Giveaway";
    icon.innerHTML = '<i class="fas fa-tshirt"></i>';
    jerseyField.style.display = "block";
    matchField.style.display = "none";
    triviaSection.style.display = "none";
  } else if (type === "tickets") {
    title.textContent = "Match Tickets Giveaway";
    icon.innerHTML = '<i class="fas fa-ticket-alt"></i>';
    jerseyField.style.display = "none";
    matchField.style.display = "block";
    triviaSection.style.display = "none";
  } else if (type === "ball") {
    title.textContent = "Signed Ball Giveaway";
    icon.innerHTML = '<i class="fas fa-futbol"></i>';
    jerseyField.style.display = "none";
    matchField.style.display = "none";
    triviaSection.style.display = "block";
  }

  modal.classList.add("active");
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".trivia-option")) {
    const option = e.target.closest(".trivia-option");
    document.querySelectorAll(".trivia-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    option.classList.add("selected");
    selectedTriviaOption = option.dataset.answer === "true";
  }
});

document
  .getElementById("submitGiveaway")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const resultModal = document.getElementById("giveawayResultModal");
    const resultTitle = document.getElementById("giveawayResultTitle");
    const resultIcon = document.getElementById("giveawayResultIcon");
    const resultContent = document.getElementById("giveawayResultContent");

    document.getElementById("giveawayModal").classList.remove("active");

    if (currentGiveawayType === "jersey") {
      const name = document.getElementById("giveawayName").value;
      const number = document.getElementById("jerseyNumber").value;

      resultTitle.textContent = "Your Custom Jersey!";
      resultIcon.innerHTML = '<i class="fas fa-tshirt"></i>';
      resultContent.innerHTML = `
                    <p>Congratulations! Here's your personalized Arsenal jersey:</p>
                    <div class="jersey-preview">
                        <div class="jersey-number">${number}</div>
                        <div class="jersey-name">${name}</div>
                    </div>
                    <p>Your jersey will be shipped to you within 7-10 business days.</p>
                `;
    } else if (currentGiveawayType === "tickets") {
      const name = document.getElementById("giveawayName").value;
      const match = document.getElementById("matchSelection").value;

      resultTitle.textContent = "Your Match Tickets!";
      resultIcon.innerHTML = '<i class="fas fa-ticket-alt"></i>';
      resultContent.innerHTML = `
                    <p>Congratulations! Here are your VIP tickets:</p>
                    <div class="ticket-preview">
                        <div class="ticket-match">${match}</div>
                        <div class="ticket-stadium">Emirates Stadium, London</div>
                        <div class="ticket-seat">
                            <div>VIP Seats</div>
                            <div class="ticket-name">${name}</div>
                        </div>
                        <p>Your tickets will be emailed to you within 24 hours.</p>
                    </div>
                `;
    } else if (currentGiveawayType === "ball") {
      if (selectedTriviaOption === null) {
        alert("Please select an answer");
        return;
      }

      if (selectedTriviaOption) {
        resultTitle.textContent = "Congratulations!";
        resultIcon.innerHTML = '<i class="fas fa-futbol"></i>';
        resultContent.innerHTML = `
                        <p>Your answer is correct! You've won a signed Arsenal match ball.</p>
                        <p>The ball will be shipped to you within 14 business days.</p>
                    `;
      } else {
        resultTitle.textContent = "Try Again!";
        resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        resultContent.innerHTML = `
                        <p>Sorry, that's not the correct answer. Thierry Henry is Arsenal's all-time top goalscorer.</p>
                        <p>Better luck next time!</p>
                    `;
      }
    }

    resultModal.classList.add("active");
  });

document.getElementById("postImage").addEventListener("change", function (e) {
  const file = this.files[0];
  const fileName = document.getElementById("fileName");
  const preview = document.getElementById("imagePreview");

  if (file) {
    fileName.textContent = file.name;
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

document
  .getElementById("editPostImage")
  .addEventListener("change", function (e) {
    const file = this.files[0];
    const fileName = document.getElementById("editFileName");
    const preview = document.getElementById("editImagePreview");

    if (file) {
      fileName.textContent = file.name;
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };

      reader.readAsDataURL(file);
    }
  });

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("successModal").classList.remove("active");
});

document.getElementById("modalOk").addEventListener("click", () => {
  document.getElementById("successModal").classList.remove("active");
});

document.getElementById("shareModalClose").addEventListener("click", () => {
  document.getElementById("shareModal").classList.remove("active");
});

document.getElementById("commentsModalClose").addEventListener("click", () => {
  document.getElementById("commentsModal").classList.remove("active");
});

document.getElementById("editPostClose").addEventListener("click", () => {
  document.getElementById("editPostModal").classList.remove("active");
});

document.getElementById("deleteModalClose").addEventListener("click", () => {
  document.getElementById("deleteModal").classList.remove("active");
});

document.getElementById("giveawayClose").addEventListener("click", () => {
  document.getElementById("giveawayModal").classList.remove("active");
});

document.getElementById("giveawayResultClose").addEventListener("click", () => {
  document.getElementById("giveawayResultModal").classList.remove("active");
});

document.getElementById("giveawayResultOk").addEventListener("click", () => {
  document.getElementById("giveawayResultModal").classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  showPage("home");

  document.getElementById("mainFooter").style.display = "block";

  loadPosts();

  initCarousel();
});
