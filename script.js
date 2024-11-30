// �̹��� ��� ����
const imageMap = {
    // �ܵ� ���� �̹���
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

    // �ܵ� ���� �̹���
    "a": "images/a.png",
    "o": "images/o.png",
    "i": "images/i.png",
    "e": "images/e.png",
    "u": "images/u.png",

    // �ڸ��� ���� �̹���
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

    // �߰� ���� ��ȣ
    "M": "images/mark_bottom.png",  // �� ���� �Ʒ�
    "G": "images/mark_center.png", // �� ���� �߾�
    "N": "images/mark_top.png"      // �� ���� ��
};
// ������ ���� ���� ��Ģ ó�� �Լ�
function processInput(input) {
    const result = [];
    let buffer = ""; // ���� ���� ���� ���ڿ�

    // ���� ó��
    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        // ����-���� ���� �Ǵ�
        if (/[pbmlsjdtngkh]/.test(char)) { // ������ ���
            if (buffer) {
                result.push(buffer); // ���� ���յ� ���� ����
            }
            buffer = char; // ���� ���� ����
        } else if (/[aoieu]/.test(char)) { // ������ ���
            if (buffer && imageMap[buffer + char]) {
                result.push(buffer + char); // ����+���� ���� ����
                buffer = ""; // ���� �ʱ�ȭ
            } else {
                if (buffer) {
                    result.push(buffer); // ���� ���� ����
                }
                result.push(char); // ������ ���� ����
                buffer = ""; // ���� �ʱ�ȭ
            }
        } else {
            // ��Ÿ ���� (����, Ư������ ��)
            if (buffer) {
                result.push(buffer); // ���� ���� ����
                buffer = ""; // ���� �ʱ�ȭ
            }
            result.push(char); // ��Ÿ ���� ����
        }
    }

    // ������ ���� ó��
    if (buffer) {
        result.push(buffer);
    }

    return result.map(chunk => {
        if (imageMap[chunk]) {
            // ������ �´� �̹��� ���
            const img = document.createElement("img");
            img.src = imageMap[chunk];
            img.alt = chunk;
            img.style.margin = "1px";
            return img.outerHTML; // HTML�� ��ȯ
        } else {
            // ������ �ƴϸ� �ؽ�Ʈ�� ���
            return `<span style="margin: 1px;">${chunk}</span>`;
        }
    }).join(""); // ��� ����� HTML ���ڿ��� ��ħ
}

// �Է� ó��
const inputArea = document.getElementById("input-area");
const outputArea = document.getElementById("output-area");

inputArea.addEventListener("input", () => {
    const input = inputArea.value.trim();
    outputArea.innerHTML = ""; // ���� ��� �ʱ�ȭ

    const processedOutput = processInput(input);
    outputArea.innerHTML = processedOutput; // ó���� ��� ���
});

// ���� ��ư
function copyToClipboard() {
    const outputField = document.getElementById("output-area");
    const textToCopy = outputField.innerText || outputField.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("�ؽ�Ʈ�� ����Ǿ����ϴ�!");
        })
        .catch((err) => {
            console.error("���� ����:", err);
        });
}

// �̹��� ���� ��ư
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", () => {
    html2canvas(outputArea).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "output.png";
        link.click();
    });
});
