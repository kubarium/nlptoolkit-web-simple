function include(file) {
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);
}

include('../data/turkish-dictionary.js');

document.getElementById('wordSearch').addEventListener('submit', function (event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    for (let i = 0; i < turkishDictionary.length; i++) {
        const wordObject = turkishDictionary[i];
        const wordName = wordObject["word"]
        const wordTags = wordObject["tagSet"]
        if (wordName === word) {
            let display = wordName + ":";
            if (wordTags.includes("IS_SD")){
                if (wordName.endsWith("ç")){
                    display = wordName + "(cı):"
                } else {
                    if (wordName.endsWith("k")){
                        display = wordName + "(ğı):"
                    } else {
                        if (wordName.endsWith("t")){
                            display = wordName + "(dı):"
                        } else {
                            display = wordName + "(bı):"
                        }
                    }
                }
            }
            if (wordTags.includes("IS_ST")){
                display = wordName + "(" + wordName.at(wordName.length - 1) + wordName.at(wordName.length - 1) + "ı):"
            }
            if (wordTags.includes("IS_KG")){
                display = wordName + "(gi):"
            }
            if (wordTags.includes("F_GUD")){
                display = wordName.endsWith("a") ? wordName + "(ıyor):" : wordName + "(iyor):";
            }
            let firstTime = true;
            if (wordTags.includes("IS_OA")) {
                display = display + " Özel İsim"
                firstTime = false
            }
            if (wordTags.includes("CL_ISIM")) {
                if (firstTime){
                    display = wordTags.includes("IS_CA") ? display + " Çoğul Cins İsim" : display + " Cins İsim";
                } else {
                    display = wordTags.includes("IS_CA") ? display + ", Çoğul Cins İsim" : display + ", Cins İsim";
                }
                firstTime = false
            }
            if (wordTags.includes("IS_BILEŞ")) {
                display = firstTime ? display + " Bileşik İsim" : display + ", Bileşik İsim";
                firstTime = false
            }
            if (wordTags.includes("CL_FIIL")) {
                display = firstTime ? display + " Fiil" : display + ", Fiil";
                firstTime = false
            }
            if (wordTags.includes("IS_ADJ") || wordTags.includes("IS_PUREADJ")) {
                display = firstTime ? display + " Sıfat" : display + ", Sıfat";
                firstTime = false
            }
            if (wordTags.includes("IS_ADVERB")) {
                display = firstTime ? display + " Zarf" : display + ", Zarf";
                firstTime = false
            }
            if (wordTags.includes("IS_ZM")) {
                display = firstTime ? display + " Zamir" : display + ", Zamir";
                firstTime = false
            }
            if (wordTags.includes("IS_POSTP")) {
                display = firstTime ? display + " Edat" : display + ", Edat";
                firstTime = false
            }
            if (wordTags.includes("IS_SAYI")) {
                display = firstTime ? display + " Sayı" : display + ", Sayı";
                firstTime = false
            }
            if (wordTags.includes("IS_CONJ")) {
                display = firstTime ? display + " Bağlaç" : display + ", Bağlaç";
                firstTime = false
            }
            document.getElementById("result").textContent = display;
            return;
        }
    }
    document.getElementById("result").textContent = "Bu kelime sözlükte yok";
});
