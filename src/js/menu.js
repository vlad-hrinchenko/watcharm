document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openMenuButton");
  const closeBtn = document.getElementById("closeMenuButton");
  const overlay = document.getElementById("modalOverlay");
  const menu = document.getElementById("menuMobile");

  const desktopItems = document.querySelectorAll(".header-list .list-item");
  const mobileItems = document.querySelectorAll(".mobile-menu-list .menu-item");

  // Відкриття бургер-меню
  openBtn.addEventListener("click", () => {
    overlay.classList.add("is-open");
    menu.classList.add("is-open");
  });

  // Закриття бургер-меню
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("is-open");
    menu.classList.remove("is-open");
  });

  // Закриття по кліку на фон
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("is-open");
      menu.classList.remove("is-open");
    }
  });

  // Функція для активації класу
  function activateMenuItem(clickedItem, allItems, className) {
    allItems.forEach(item => item.classList.remove(className));
    clickedItem.classList.add(className);
  }

  // Клік по десктоп-меню
  desktopItems.forEach(item => {
    item.addEventListener("click", () => {
      activateMenuItem(item, desktopItems, "current");
    });
  });

  // Клік по мобільному меню
  mobileItems.forEach(item => {
    item.addEventListener("click", () => {
      activateMenuItem(item, mobileItems, "menu-current");

      // Закрити меню після кліку
      overlay.classList.remove("is-open");
      menu.classList.remove("is-open");
    });
  });
});
