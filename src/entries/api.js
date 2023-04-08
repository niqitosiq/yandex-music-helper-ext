export function getScriptExecution(tab) {
  return (code) =>
    browser.tabs.executeScript(tab.id, {
      code,
    });
}
