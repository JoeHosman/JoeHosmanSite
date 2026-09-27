const controls = document.querySelector<HTMLElement>("[data-filters]");
if (controls) {
  const buttons = Array.from(
    controls.querySelectorAll<HTMLButtonElement>(
      "button[data-category], button[data-filter-all]",
    ),
  );
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("[data-project]"),
  );
  const result = controls.querySelector<HTMLElement>("[data-result-count]");
  const categories = new Map(
    cards.map((card) => [
      card,
      JSON.parse(card.dataset.categories ?? "[]") as string[],
    ]),
  );
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const selected = button.dataset.category;
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      let count = 0;
      cards.forEach((card) => {
        card.hidden =
          !button.hasAttribute("data-filter-all") &&
          !categories.get(card)!.includes(selected ?? "");
        if (!card.hidden) count++;
      });
      if (result)
        result.textContent = `${count} ${count === 1 ? "project" : "projects"}`;
    }),
  );
  controls.hidden = false;
}
