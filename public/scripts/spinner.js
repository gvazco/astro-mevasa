export function startSpinner() {
  const spinner = document.createElement("div");
  spinner.className =
    "fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50";
  spinner.innerHTML =
    '<div class="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12"></div>';
  document.body.appendChild(spinner);

  return function stop() {
    document.body.removeChild(spinner);
  };
}
