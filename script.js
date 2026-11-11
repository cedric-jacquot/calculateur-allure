function switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));

    if (tabName === "pace") {
        document.querySelectorAll(".tab-btn")[0].classList.add("active");
        document.getElementById("tab-pace").classList.add("active");
    } else {
        document.querySelectorAll(".tab-btn")[1].classList.add("active");
        document.getElementById("tab-time").classList.add("active");
    }
}

function setPresetDistance(tab, dist) {
    if (tab === "pace") {
        document.getElementById("pace-dist").value = dist;
        calculatePace();
    } else {
        document.getElementById("time-dist").value = dist;
        calculateTime();
    }
}

function formatTwoDigits(num) {
    return String(num).padStart(2, "0");
}

function calculatePace() {
    const dist = parseFloat(document.getElementById("pace-dist").value);
    const h = parseInt(document.getElementById("pace-h").value) || 0;
    const m = parseInt(document.getElementById("pace-m").value) || 0;
    const s = parseInt(document.getElementById("pace-s").value) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;

    if (!dist || dist <= 0 || totalSeconds <= 0) {
        document.getElementById("pace-res-pace").innerText = "--:-- min/km";
        document.getElementById("pace-res-speed").innerText = "-- km/h";
        return;
    }

    const secPerKm = totalSeconds / dist;
    const paceMin = Math.floor(secPerKm / 60);
    const paceSec = Math.round(secPerKm % 60);

    const finalPaceMin = paceSec === 60 ? paceMin + 1 : paceMin;
    const finalPaceSec = paceSec === 60 ? 0 : paceSec;

    const speedKmH = (dist / (totalSeconds / 3600)).toFixed(2);

    document.getElementById("pace-res-pace").innerText = `${finalPaceMin}'${formatTwoDigits(finalPaceSec)}" /km`;
    document.getElementById("pace-res-speed").innerText = `${speedKmH} km/h`;
}

function calculateTime() {
    const dist = parseFloat(document.getElementById("time-dist").value);
    const paceM = parseInt(document.getElementById("time-pace-m").value) || 0;
    const paceS = parseInt(document.getElementById("time-pace-s").value) || 0;

    const secPerKm = paceM * 60 + paceS;

    if (!dist || dist <= 0 || secPerKm <= 0) {
        document.getElementById("time-res-time").innerText = "--:--:--";
        document.getElementById("time-res-speed").innerText = "-- km/h";
        return;
    }

    const totalSeconds = Math.round(dist * secPerKm);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const speedKmH = (3600 / secPerKm).toFixed(2);

    const formattedTime =
        h > 0 ? `${h}h ${formatTwoDigits(m)}m ${formatTwoDigits(s)}s` : `${formatTwoDigits(m)}m ${formatTwoDigits(s)}s`;

    document.getElementById("time-res-time").innerText = formattedTime;
    document.getElementById("time-res-speed").innerText = `${speedKmH} km/h`;
}
