// 이미지 경로 맵핑
const imageMap = {
    // 단독 자음 이미지
    "p": "images/p.png",
    "b": "images/b.png",
    "m": "images/m.png",
    "l": "images/l.png",
    "s": "images/s.png",
    "j": "images/j.png",
    "d": "images/d.png",
    "t": "images/t.png",
    "n": "images/n.png",
    "k": "images/k.png",
    "g": "images/g.png",
    "h": "images/h.png",

    // 단독 모음 이미지
    "a": "images/a.png",
    "o": "images/o.png",
    "i": "images/i.png",
    "e": "images/e.png",
    "u": "images/u.png",

    // 자모음 조합 이미지
    "pa": "images/pa.png", "po": "images/po.png", "pi": "images/pi.png", "pe": "images/pe.png", "pu": "images/pu.png",
    "ba": "images/ba.png", "bo": "images/bo.png", "bi": "images/bi.png", "be": "images/be.png", "bu": "images/bu.png",
    "ma": "images/ma.png", "mo": "images/mo.png", "mi": "images/mi.png", "me": "images/me.png", "mu": "images/mu.png",
    "la": "images/la.png", "lo": "images/lo.png", "li": "images/li.png", "le": "images/le.png", "lu": "images/lu.png",
    "sa": "images/sa.png", "so": "images/so.png", "si": "images/si.png", "se": "images/se.png", "su": "images/su.png",
    "ja": "images/ja.png", "jo": "images/jo.png", "ji": "images/ji.png", "je": "images/je.png", "ju": "images/ju.png",
    "da": "images/da.png", "do": "images/do.png", "di": "images/di.png", "de": "images/de.png", "du": "images/du.png",
    "ta": "images/ta.png", "to": "images/to.png", "ti": "images/ti.png", "te": "images/te.png", "tu": "images/tu.png",
    "na": "images/na.png", "no": "images/no.png", "ni": "images/ni.png", "ne": "images/ne.png", "nu": "images/nu.png",
    "ka": "images/ka.png", "ko": "images/ko.png", "ki": "images/ki.png", "ke": "images/ke.png", "ku": "images/ku.png",
    "ga": "images/ga.png", "go": "images/go.png", "gi": "images/gi.png", "ge": "images/ge.png", "gu": "images/gu.png",
    "ha": "images/ha.png", "ho": "images/ho.png", "hi": "images/hi.png", "he": "images/he.png", "hu": "images/hu.png",

    // 추가 문장 부호
    "M": "images/mark_bottom.png",  // ≡ 우측 아래
    "G": "images/mark_center.png", // ≡ 우측 중앙
    "N": "images/mark_top.png"      // ≡ 우측 위
};
// 자음과 모음 결합 규칙 처리 함수
function processInput(input) {
    const result = [];
    let buffer = ""; // 현재 조합 중인 문자열

    // 병음 처리
    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        // 자음-모음 조합 판단
        if (/[pbmlsjdtngkh]/.test(char)) { // 자음일 경우
            if (buffer) {
                result.push(buffer); // 이전 조합된 글자 저장
            }
            buffer = char; // 현재 자음 저장
        } else if (/[aoieu]/.test(char)) { // 모음일 경우
            if (buffer && imageMap[buffer + char]) {
                result.push(buffer + char); // 자음+모음 조합 저장
                buffer = ""; // 버퍼 초기화
            } else {
                if (buffer) {
                    result.push(buffer); // 이전 자음 저장
                }
                result.push(char); // 모음을 개별 저장
                buffer = ""; // 버퍼 초기화
            }
        } else {
            // 기타 문자 (띄어쓰기, 특수문자 등)
            if (buffer) {
                result.push(buffer); // 버퍼 내용 저장
                buffer = ""; // 버퍼 초기화
            }
            result.push(char); // 기타 문자 저장
        }
    }

    // 마지막 버퍼 처리
    if (buffer) {
        result.push(buffer);
    }

    return result.map(chunk => {
        if (imageMap[chunk]) {
            // 병음에 맞는 이미지 출력
            const img = document.createElement("img");
            img.src = imageMap[chunk];
            img.alt = chunk;
            img.style.margin = "1px";
            return img.outerHTML; // HTML로 반환
        } else {
            // 병음이 아니면 텍스트로 출력
            return `<span style="margin: 1px;">${chunk}</span>`;
        }
    }).join(""); // 모든 결과를 HTML 문자열로 합침
}

// 입력 처리
const inputArea = document.getElementById("input-area");
const outputArea = document.getElementById("output-area");

inputArea.addEventListener("input", () => {
    const input = inputArea.value.trim();
    outputArea.innerHTML = ""; // 기존 출력 초기화

    const processedOutput = processInput(input);
    outputArea.innerHTML = processedOutput; // 처리된 결과 출력
});

// 복사 버튼
function copyToClipboard() {
    const outputField = document.getElementById("output-area");
    const textToCopy = outputField.innerText || outputField.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("텍스트가 복사되었습니다!");
        })
        .catch((err) => {
            console.error("복사 실패:", err);
        });
}

// 이미지 저장 버튼
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", () => {
    html2canvas(outputArea).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "output.png";
        link.click();
    });
});
