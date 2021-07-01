const { app, Menu, Tray } = require("electron");
const path = require("path");

let ram, cpu;

const getRam = () => {
  const { total, free } = process.getSystemMemoryInfo();
  const usagePercentage = (((total - free) / total) * 100).toFixed(1);
  return ` ${usagePercentage < 100 ? usagePercentage : 100}%`;
};

const getCpu = () => {
  const cpuUsage = (process.getCPUUsage().percentCPUUsage * 100).toFixed(1);
  return ` ${cpuUsage < 100 ? cpuUsage : 100}%`;
};

app.dock.hide();

const contextMenu = Menu.buildFromTemplate([
  { label: "Quit", click: () => app.quit() },
]);

app
  .whenReady()
  .then(() => {
    ram = new Tray(path.join(__dirname, "assets", "ram.png"));
    cpu = new Tray(path.join(__dirname, "assets", "cpu.png"));
    ram.setContextMenu(contextMenu);
    cpu.setContextMenu(contextMenu);

    ram.setTitle(" 0.0%");
    cpu.setTitle(" 0.0%");

    ram.setToolTip("Ram usage");
    cpu.setToolTip("Cpu usage");
  })
  .then(() => {
    setInterval(() => {
      ram.setTitle(getRam());
      cpu.setTitle(getCpu());
    }, 1500);
  });
