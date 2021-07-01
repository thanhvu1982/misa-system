import { app, Menu, Tray } from "electron";

let ram: Tray, cpu: Tray;

const getRam = () => {
  const { total, free } = process.getSystemMemoryInfo();
  const usagePercentage = ((total - free) / total) * 100;
  return ` ${usagePercentage < 100 ? usagePercentage.toFixed(1) : 100}%`;
};

const getCpu = () => {
  const cpuUsage = process.getCPUUsage().percentCPUUsage * 100;
  return ` ${cpuUsage < 100 ? cpuUsage.toFixed(1) : 100}%`;
};

app.dock.hide();

const contextMenu = Menu.buildFromTemplate([
  { label: "Quit", click: () => app.quit() },
]);

app
  .whenReady()
  .then(() => {
    ram = new Tray(`${__dirname}/static/ram.png`);
    cpu = new Tray(`${__dirname}/static/cpu.png`);

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
