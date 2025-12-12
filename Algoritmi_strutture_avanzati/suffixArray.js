class suffixArray {

    constructor(){

        this.len = 0;
        this.t = [];
        this.sa = [];
        this.lcp = [];
        this.constructedSa = false;
        this.constructedLcpArray = false
    }


    newSuffix(text){
       if(text === null) throw new Error('Il testo non può essere nullo');
       this.t = text
       this.len = text.length
    }


    getTextLen(){
        return this.len
    }

    getSa(){
        this.buildSuffixArray();
        return this.sa
    }






    //Metodi di building



    buildSuffixArray(){
        if(this.constructedSa) return;
        this.construct();
        this.constructedSa = true
    }

    construct(){}

    buildLcpArray(){
        if(this.constructedLcpArray) return;
        this.buildSuffixArray();
    }




    kasai(){
        let lcp = new Array(this.len)
        let inv = new Array(this.len)

        for(let i = 0; i<this.len; i++){inv[this.sa[i]]}
        for(let i = 0, lent = 0; i<this.len;i++){

            if(inv[i] > 0){
                let k = this.sa[inv[i] - 1];
                while((i + lent < this.len) && (k+lent < this.len) && this.t[i + lent] == this.t[k+lent]){
                    lent++
                }
                lcp[inv[i]] = lent;
                if(lent > 0) len--;
            }






        }




    }


    string(){

        if(!this.constructedLcpArray) this.buildLcpArray();
        let s = [];
        s.push("-----i-----SA-----LCP---Suffix\n");


        for(let i = 0; i < this.len; i++){
            let suffixLen = this.len - this.sa[i];
            let suffixArray = new Array(suffixLen);
            for(let j = this.sa[i], k = 0; j < this.len;j++,k++){ suffixArray[k] = this.t[j]};
            let suffix = new Array(suffixArray);
            let formattedStr = ("% 7d % 7d % 7d %s\n",i,sa[i],this.lcp[i],suffix)
            s.push(formattedStr)

        }
        return s.toString()


    }




}