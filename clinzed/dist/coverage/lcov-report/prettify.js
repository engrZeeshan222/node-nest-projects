!function () {
    var q = !0, t = null, D = !1;
    window.PR_SHOULD_USE_CONTINUATION = q;
    (function () {
        function X(b) {
            function d(e) { var c = e.charCodeAt(0); if (92 !== c)
                return c; var a = e.charAt(1); return (c = u[a]) ? c : "0" <= a && "7" >= a ? parseInt(e.substring(1), 8) : "u" === a || "x" === a ? parseInt(e.substring(2), 16) : e.charCodeAt(1); }
            function g(e) { if (32 > e)
                return (16 > e ? "\\x0" : "\\x") + e.toString(16); e = String.fromCharCode(e); return "\\" === e || "-" === e || "]" === e || "^" === e ? "\\" + e : e; }
            function c(e) {
                var c = e.substring(1, e.length - 1).match(/\\u[0-9A-Fa-f]{4}|\\x[0-9A-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\s\S]|-|[^-\\]/g);
                e =
                    [];
                var a = "^" === c[0], b = ["["];
                a && b.push("^");
                for (var a = a ? 1 : 0, f = c.length; a < f; ++a) {
                    var h = c[a];
                    if (/\\[bdsw]/i.test(h))
                        b.push(h);
                    else {
                        var h = d(h), n;
                        a + 2 < f && "-" === c[a + 1] ? (n = d(c[a + 2]), a += 2) : n = h;
                        e.push([h, n]);
                        65 > n || 122 < h || (65 > n || 90 < h || e.push([Math.max(65, h) | 32, Math.min(n, 90) | 32]), 97 > n || 122 < h || e.push([Math.max(97, h) & -33, Math.min(n, 122) & -33]));
                    }
                }
                e.sort(function (e, a) { return e[0] - a[0] || a[1] - e[1]; });
                c = [];
                f = [];
                for (a = 0; a < e.length; ++a)
                    h = e[a], h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : c.push(f = h);
                for (a = 0; a < c.length; ++a)
                    h = c[a],
                        b.push(g(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && b.push("-"), b.push(g(h[1])));
                b.push("]");
                return b.join("");
            }
            function v(e) {
                for (var a = e.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), b = a.length, d = [], f = 0, h = 0; f < b; ++f) {
                    var n = a[f];
                    "(" === n ? ++h : "\\" === n.charAt(0) && (n = +n.substring(1)) && (n <= h ? d[n] = -1 : a[f] = g(n));
                }
                for (f = 1; f < d.length; ++f)
                    -1 === d[f] && (d[f] = ++y);
                for (h = f = 0; f < b; ++f)
                    n = a[f], "(" ===
                        n ? (++h, d[h] || (a[f] = "(?:")) : "\\" === n.charAt(0) && (n = +n.substring(1)) && n <= h && (a[f] = "\\" + d[n]);
                for (f = 0; f < b; ++f)
                    "^" === a[f] && "^" !== a[f + 1] && (a[f] = "");
                if (e.ignoreCase && p)
                    for (f = 0; f < b; ++f)
                        n = a[f], e = n.charAt(0), 2 <= n.length && "[" === e ? a[f] = c(n) : "\\" !== e && (a[f] = n.replace(/[a-zA-Z]/g, function (a) { a = a.charCodeAt(0); return "[" + String.fromCharCode(a & -33, a | 32) + "]"; }));
                return a.join("");
            }
            for (var y = 0, p = D, l = D, m = 0, a = b.length; m < a; ++m) {
                var k = b[m];
                if (k.ignoreCase)
                    l = q;
                else if (/[a-z]/i.test(k.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
                    p = q;
                    l = D;
                    break;
                }
            }
            for (var u = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 }, r = [], m = 0, a = b.length; m < a; ++m) {
                k = b[m];
                if (k.global || k.multiline)
                    throw Error("" + k);
                r.push("(?:" + v(k) + ")");
            }
            return RegExp(r.join("|"), l ? "gi" : "g");
        }
        function Y(b, d) {
            function g(b) {
                var a = b.nodeType;
                if (1 == a) {
                    if (!c.test(b.className)) {
                        for (a = b.firstChild; a; a = a.nextSibling)
                            g(a);
                        a = b.nodeName.toLowerCase();
                        if ("br" === a || "li" === a)
                            v[l] = "\n", p[l << 1] = y++, p[l++ << 1 | 1] = b;
                    }
                }
                else if (3 == a || 4 == a)
                    a = b.nodeValue, a.length && (a = d ? a.replace(/\r\n?/g, "\n") : a.replace(/[ \t\r\n]+/g, " "), v[l] = a, p[l << 1] = y, y += a.length, p[l++ << 1 | 1] = b);
            }
            var c = /(?:^|\s)nocode(?:\s|$)/, v = [], y = 0, p = [], l = 0;
            g(b);
            return { a: v.join("").replace(/\n$/, ""), d: p };
        }
        function M(b, d, g, c) { d && (b = { a: d, e: b }, g(b), c.push.apply(c, b.g)); }
        function Z(b) { for (var d = void 0, g = b.firstChild; g; g = g.nextSibling)
            var c = g.nodeType, d = 1 === c ? d ? b : g : 3 === c ? $.test(g.nodeValue) ? b : d : d; return d === b ? void 0 : d; }
        function I(b, d) {
            function g(b) {
                for (var l = b.e, m = [l, "pln"], a = 0, k = b.a.match(v) || [], u = {}, r = 0, e = k.length; r < e; ++r) {
                    var C = k[r], B = u[C], w = void 0, f;
                    if ("string" ===
                        typeof B)
                        f = D;
                    else {
                        var h = c[C.charAt(0)];
                        if (h)
                            w = C.match(h[1]), B = h[0];
                        else {
                            for (f = 0; f < y; ++f)
                                if (h = d[f], w = C.match(h[1])) {
                                    B = h[0];
                                    break;
                                }
                            w || (B = "pln");
                        }
                        if ((f = 5 <= B.length && "lang-" === B.substring(0, 5)) && !(w && "string" === typeof w[1]))
                            f = D, B = "src";
                        f || (u[C] = B);
                    }
                    h = a;
                    a += C.length;
                    if (f) {
                        f = w[1];
                        var n = C.indexOf(f), F = n + f.length;
                        w[2] && (F = C.length - w[2].length, n = F - f.length);
                        B = B.substring(5);
                        M(l + h, C.substring(0, n), g, m);
                        M(l + h + n, f, N(B, f), m);
                        M(l + h + F, C.substring(F), g, m);
                    }
                    else
                        m.push(l + h, B);
                }
                b.g = m;
            }
            var c = {}, v;
            (function () {
                for (var g = b.concat(d), l = [], m = {}, a = 0, k = g.length; a < k; ++a) {
                    var u = g[a], r = u[3];
                    if (r)
                        for (var e = r.length; 0 <= --e;)
                            c[r.charAt(e)] = u;
                    u = u[1];
                    r = "" + u;
                    m.hasOwnProperty(r) || (l.push(u), m[r] = t);
                }
                l.push(/[\0-\uffff]/);
                v = X(l);
            })();
            var y = d.length;
            return g;
        }
        function z(b) {
            var d = [], g = [];
            b.tripleQuotedStrings ? d.push(["str", /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, t, "'\""]) : b.multiLineStrings ? d.push(["str",
                /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, t, "'\"`"]) : d.push(["str", /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, t, "\"'"]);
            b.verbatimStrings && g.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, t]);
            var c = b.hashComments;
            c && (b.cStyleComments ? (1 < c ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, t, "#"]) : d.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, t, "#"]), g.push(["str",
                /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, t])) : d.push(["com", /^#[^\r\n]*/, t, "#"]));
            b.cStyleComments && (g.push(["com", /^\/\/[^\r\n]*/, t]), g.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, t]));
            if (c = b.regexLiterals) {
                var v = (c = 1 < c ? "" : "\n\r") ? "." : "[\\S\\s]";
                g.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
                        ("/(?=[^/*" + c + "])(?:[^/\\x5B\\x5C" + c + "]|\\x5C" + v + "|\\x5B(?:[^\\x5C\\x5D" + c + "]|\\x5C" + v + ")*(?:\\x5D|$))+/") + ")")]);
            }
            (c = b.types) && g.push(["typ", c]);
            c = ("" + b.keywords).replace(/^ | $/g, "");
            c.length && g.push(["kwd", RegExp("^(?:" + c.replace(/[\s,]+/g, "|") + ")\\b"), t]);
            d.push(["pln", /^\s+/, t, " \r\n\t\u00a0"]);
            c = "^.[^\\s\\w.$@'\"`/\\\\]*";
            b.regexLiterals && (c += "(?!s*/)");
            g.push(["lit", /^@[a-z_$][a-z_$@0-9]*/i, t], ["typ", /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, t], ["pln", /^[a-z_$][a-z_$@0-9]*/i, t], ["lit",
                /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, t, "0123456789"], ["pln", /^\\[\s\S]?/, t], ["pun", RegExp(c), t]);
            return I(d, g);
        }
        function O(b, d, g) {
            function c(a) {
                var b = a.nodeType;
                if (1 == b && !y.test(a.className))
                    if ("br" === a.nodeName)
                        v(a), a.parentNode && a.parentNode.removeChild(a);
                    else
                        for (a = a.firstChild; a; a = a.nextSibling)
                            c(a);
                else if ((3 == b || 4 == b) && g) {
                    var d = a.nodeValue, k = d.match(p);
                    k && (b = d.substring(0, k.index), a.nodeValue = b, (d = d.substring(k.index + k[0].length)) && a.parentNode.insertBefore(l.createTextNode(d), a.nextSibling), v(a), b || a.parentNode.removeChild(a));
                }
            }
            function v(b) { function c(a, b) { var d = b ? a.cloneNode(D) : a, e = a.parentNode; if (e) {
                var e = c(e, 1), g = a.nextSibling;
                e.appendChild(d);
                for (var k = g; k; k = g)
                    g = k.nextSibling, e.appendChild(k);
            } return d; } for (; !b.nextSibling;)
                if (b = b.parentNode, !b)
                    return; b = c(b.nextSibling, 0); for (var d; (d = b.parentNode) && 1 === d.nodeType;)
                b = d; a.push(b); }
            for (var y = /(?:^|\s)nocode(?:\s|$)/, p = /\r\n?|\n/, l = b.ownerDocument, m = l.createElement("li"); b.firstChild;)
                m.appendChild(b.firstChild);
            for (var a = [m], k = 0; k < a.length; ++k)
                c(a[k]);
            d === (d | 0) && a[0].setAttribute("value", d);
            var u = l.createElement("ol");
            u.className = "linenums";
            d = Math.max(0, d - 1 | 0) || 0;
            for (var k = 0, r = a.length; k < r; ++k)
                m = a[k], m.className = "L" + (k + d) % 10, m.firstChild || m.appendChild(l.createTextNode("\u00a0")), u.appendChild(m);
            b.appendChild(u);
        }
        function x(b, d) { for (var g = d.length; 0 <= --g;) {
            var c = d[g];
            K.hasOwnProperty(c) ? J.console && console.warn("cannot override language handler %s", c) : K[c] = b;
        } }
        function N(b, d) {
            if (!b || !K.hasOwnProperty(b))
                b = /^\s*</.test(d) ?
                    "default-markup" : "default-code";
            return K[b];
        }
        function P(b) {
            var d = b.h;
            try {
                var g = Y(b.c, b.i), c = g.a;
                b.a = c;
                b.d = g.d;
                b.e = 0;
                N(d, c)(b);
                var v = /\bMSIE\s(\d+)/.exec(navigator.userAgent), v = v && 8 >= +v[1], d = /\n/g, y = b.a, p = y.length, g = 0, l = b.d, m = l.length, c = 0, a = b.g, k = a.length, u = 0;
                a[k] = p;
                var r, e;
                for (e = r = 0; e < k;)
                    a[e] !== a[e + 2] ? (a[r++] = a[e++], a[r++] = a[e++]) : e += 2;
                k = r;
                for (e = r = 0; e < k;) {
                    for (var x = a[e], B = a[e + 1], w = e + 2; w + 2 <= k && a[w + 1] === B;)
                        w += 2;
                    a[r++] = x;
                    a[r++] = B;
                    e = w;
                }
                a.length = r;
                var f = b.c, h;
                f && (h = f.style.display, f.style.display = "none");
                try {
                    for (; c < m;) {
                        var n = l[c + 2] || p, F = a[u + 2] || p, w = Math.min(n, F), E = l[c + 1], L;
                        if (1 !== E.nodeType && (L = y.substring(g, w))) {
                            v && (L = L.replace(d, "\r"));
                            E.nodeValue = L;
                            var Q = E.ownerDocument, s = Q.createElement("span");
                            s.className = a[u + 1];
                            var z = E.parentNode;
                            z.replaceChild(s, E);
                            s.appendChild(E);
                            g < n && (l[c + 1] = E = Q.createTextNode(y.substring(w, n)), z.insertBefore(E, s.nextSibling));
                        }
                        g = w;
                        g >= n && (c += 2);
                        g >= F && (u += 2);
                    }
                }
                finally {
                    f && (f.style.display = h);
                }
            }
            catch (A) {
                J.console && console.log(A && A.stack || A);
            }
        }
        var J = window, G = ["break,continue,do,else,for,if,return,while"], H = [[G, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"], R = [H, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], S = [H, "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"], T = [H, "abstract,as,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,group,implicit,in,interface,internal,into,is,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"], H = [H, "debugger,eval,export,function,get,instanceof,null,set,undefined,var,with,Infinity,NaN"], U = [G, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], V = [G, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], G = [G, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], W = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, $ = /\S/, aa = z({ keywords: [R, T, S, H, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", U, V, G], hashComments: q, cStyleComments: q, multiLineStrings: q, regexLiterals: q }), K = {};
        x(aa, ["default-code"]);
        x(I([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\s\S]*?(?:-\->|$)/], ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/], ["lang-", /^<%([\s\S]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-",
                /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), "default-markup htm html mxml xhtml xml xsl".split(" "));
        x(I([["pln", /^[\s]+/, t, " \t\r\n"], ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, t, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/], ["pun",
                /^[=<>\/]+/], ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i], ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i], ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i], ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i], ["lang-css", /^style\s*=\s*\'([^\']+)\'/i], ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]]), ["in.tag"]);
        x(I([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
        x(z({ keywords: R, hashComments: q, cStyleComments: q, types: W }), "c cc cpp cxx cyc m".split(" "));
        x(z({ keywords: "null,true,false" }), ["json"]);
        x(z({ keywords: T, hashComments: q, cStyleComments: q,
            verbatimStrings: q, types: W }), ["cs"]);
        x(z({ keywords: S, cStyleComments: q }), ["java"]);
        x(z({ keywords: G, hashComments: q, multiLineStrings: q }), ["bash", "bsh", "csh", "sh"]);
        x(z({ keywords: U, hashComments: q, multiLineStrings: q, tripleQuotedStrings: q }), ["cv", "py", "python"]);
        x(z({ keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", hashComments: q, multiLineStrings: q, regexLiterals: 2 }), ["perl",
            "pl", "pm"]);
        x(z({ keywords: V, hashComments: q, multiLineStrings: q, regexLiterals: q }), ["rb", "ruby"]);
        x(z({ keywords: H, cStyleComments: q, regexLiterals: q }), ["javascript", "js"]);
        x(z({ keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", hashComments: 3, cStyleComments: q, multilineStrings: q, tripleQuotedStrings: q, regexLiterals: q }), ["coffee"]);
        x(I([], [["str", /^[\s\S]+/]]), ["regex"]);
        var ba = J.PR =
            { createSimpleLexer: I, registerLangHandler: x, sourceDecorator: z, PR_ATTRIB_NAME: "atn", PR_ATTRIB_VALUE: "atv", PR_COMMENT: "com", PR_DECLARATION: "dec", PR_KEYWORD: "kwd", PR_LITERAL: "lit", PR_NOCODE: "nocode", PR_PLAIN: "pln", PR_PUNCTUATION: "pun", PR_SOURCE: "src", PR_STRING: "str", PR_TAG: "tag", PR_TYPE: "typ", prettyPrintOne: J.prettyPrintOne = function (b, d, g) { var c = document.createElement("div"); c.innerHTML = "<pre>" + b + "</pre>"; c = c.firstChild; g && O(c, g, q); P({ h: d, j: g, c: c, i: 1 }); return c.innerHTML; }, prettyPrint: J.prettyPrint = function (b, d) {
                    function g() {
                        for (var c = J.PR_SHOULD_USE_CONTINUATION ? a.now() + 250 : Infinity; k < y.length && a.now() < c; k++) {
                            for (var d = y[k], l = h, m = d; m = m.previousSibling;) {
                                var p = m.nodeType, s = (7 === p || 8 === p) && m.nodeValue;
                                if (s ? !/^\??prettify\b/.test(s) : 3 !== p || /\S/.test(m.nodeValue))
                                    break;
                                if (s) {
                                    l = {};
                                    s.replace(/\b(\w+)=([\w:.%+-]+)/g, function (a, b, c) { l[b] = c; });
                                    break;
                                }
                            }
                            m = d.className;
                            if ((l !== h || e.test(m)) && !x.test(m)) {
                                p = D;
                                for (s = d.parentNode; s; s = s.parentNode)
                                    if (f.test(s.tagName) && s.className && e.test(s.className)) {
                                        p = q;
                                        break;
                                    }
                                if (!p) {
                                    d.className +=
                                        " prettyprinted";
                                    p = l.lang;
                                    if (!p) {
                                        var p = m.match(r), z;
                                        if (!p && (z = Z(d)) && w.test(z.tagName))
                                            p = z.className.match(r);
                                        p && (p = p[1]);
                                    }
                                    if (B.test(d.tagName))
                                        s = 1;
                                    else
                                        var s = d.currentStyle, A = v.defaultView, s = (s = s ? s.whiteSpace : A && A.getComputedStyle ? A.getComputedStyle(d, t).getPropertyValue("white-space") : 0) && "pre" === s.substring(0, 3);
                                    A = l.linenums;
                                    if (!(A = "true" === A || +A))
                                        A = (A = m.match(/\blinenums\b(?::(\d+))?/)) ? A[1] && A[1].length ? +A[1] : q : D;
                                    A && O(d, A, s);
                                    u = { h: p, c: d, j: A, i: s };
                                    P(u);
                                }
                            }
                        }
                        k < y.length ? setTimeout(g, 250) : "function" ===
                            typeof b && b();
                    }
                    for (var c = d || document.body, v = c.ownerDocument || document, c = [c.getElementsByTagName("pre"), c.getElementsByTagName("code"), c.getElementsByTagName("xmp")], y = [], p = 0; p < c.length; ++p)
                        for (var l = 0, m = c[p].length; l < m; ++l)
                            y.push(c[p][l]);
                    var c = t, a = Date;
                    a.now || (a = { now: function () { return +new Date; } });
                    var k = 0, u, r = /\blang(?:uage)?-([\w.]+)(?!\S)/, e = /\bprettyprint\b/, x = /\bprettyprinted\b/, B = /pre|xmp/i, w = /^code$/i, f = /^(?:pre|code|xmp)$/i, h = {};
                    g();
                } };
        "function" === typeof define && define.amd && define("google-code-prettify", [], function () { return ba; });
    })();
}();
//# sourceMappingURL=prettify.js.map