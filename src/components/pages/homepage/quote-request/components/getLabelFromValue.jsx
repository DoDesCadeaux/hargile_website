/**
 * Get a label from a value and field type
 *
 * @param {string} value - The selected value
 * @param {string} fieldType - The field type (budget or timeline)
 * @param {Function} t - Translation function
 * @returns {string} The translated label
 */
export function getLabelFromValue(value, fieldType, t) {
  if (fieldType === "budget") {
    const budgetMap = {
      "< 5000": t("contact.budget.less5k"),
      "5000-10000": t("contact.budget.5kTo10k"),
      "10000-25000": t("contact.budget.10kTo25k"),
      "25000-50000": t("contact.budget.25kTo50k"),
      "> 50000": t("contact.budget.more50k"),
    };
    return budgetMap[value] || t("contact.budget.select");
  }

  if (fieldType === "timeline") {
    const timelineMap = {
      "< 1month": t("contact.timeline.less1month"),
      "1-3months": t("contact.timeline.1To3months"),
      "3-6months": t("contact.timeline.3To6months"),
      "> 6months": t("contact.timeline.more6months"),
    };
    return timelineMap[value] || t("contact.timeline.select");
  }

  return value;
}
