document.addEventListener("DOMContentLoaded", function() {
    const progressbarinner = document.querySelector('.progress-bar-inner');

    window.addEventListener('scroll', function () {
        let h = this.document.documentElement;

        let st = h.scrollTop || document.body.scrollTop;
        let sh = h.scrollHeight || document.body.scrollHeight;
        let eh = sh-(sh*.2)
        
        let percent = st / (sh-h.clientHeight) * 100;
        let roundedPercent = Math.round(percent);
        
        progressbarinner.style.height = percent + "%";
        progressbarinner.innertext = roundedPercent + "%";
        console.log(percent);

        });
});