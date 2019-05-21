class chartWidget{
    constructor(data,options,piedata,id){
        this.currchart = null;
        this.cchart = 0;
        [this.x,this.x2,this.x3] = data;
        [this.labels,this.backcolor,this.data] = options;
        this.pdata=piedata;
        this.id =id;
        this.drawpanel();
        
    }
    drawpanel(){
       
        this.card = document.createElement('div');
        this.card.className = "card";
        this.card.style=`   
        border-radius: 6px;
        color: #333;
        width:100%;
        height:100%;
        background: #fff;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);`;

        this.card_header= document.createElement('div');
        this.card_header.className = "card-haders";
        this.card_header.style=`
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        margin:0px !important;
        display:flex;
        justify-content: space-around;
        align-content:center !important;
        border:none;
        height:10%`;
        this.prev = document.createElement('button');
        this.prev.className = "arrow left";
        this.prev.setAttribute("id",'prev');
        this.prev.style=` border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        width:2px;
        height:2px;
        background:transparent;
        margin:10px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);`;

        this.h2 = document.createElement('button');
        this.h2.innerText= "Trends" ;
        this.h2.style =`background:Transparent;
        border:none;`;
       
        this.next = document.createElement('button');
        this.next.className = "arrow right";
        this.next.setAttribute("id",'next');
        this.next.style=` border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        width:2px;
        height:2px;
        background:transparent;
        margin:10px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);`;
   

        this.card_body = document.createElement('div');
        this.card_body.className = "card-body";
        this.card_body.style=`height:80%;margin:5%;`;

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute("id","mychart");

        
        this.card_header.appendChild(this.prev);
        this.card_header.appendChild(this.h2);
        this.card_header.appendChild(this.next);
        this.card_body.appendChild(this.canvas);
        this.card.appendChild(this.card_header);
        this.card.appendChild(this.card_body);
        document.getElementById('mydiv').appendChild(this.card);

      
        
    }
    drawChart(id,charttype,data,options){
        if(this.currchart!=null){
            this.currchart.destroy();
        }
        var ctx = document.getElementById(id);
        this.currchart = new Chart(ctx,{
            type: charttype,
            data: data,
            options:options
    },

        )
}
    cgraph(){
    
        if(this.cchart==0){
            var piedata={datasets: [{data: this.pdata,backgroundColor:this.backcolor,}],labels:this.labels};
            var option={legend: {position :'bottom',},
                        responsive: true,
                        maintainAspectRatio: false,
                    };
            this.drawChart(this.id,'doughnut',piedata,option);
            this.cchart=1;
        }
        else if(this.cchart==1){
            var piedata ={
                labels: dates,
                datasets:[
                {label: this.labels[0],data: this.x,backgroundColor: this.backcolor[0],},
                {label: this.labels[1],data: this.x2,backgroundColor: this.backcolor[1],},
                {label: this.labels[2],data: this.x3,backgroundColor: this.backcolor[2],},
            ]};
            var option = {
                scales: {xAxes: [{stacked: true, gridLines: { display: false },categoryPercentage:0.6,barPercentage: 0.9,}],yAxes: [{stacked: true,ticks: {autoSkip: true,maxTicksLimit: 5},}],},
                legend: {display: false},
                responsive: true,
                maintainAspectRatio: false,
            };
            this.drawChart(this.id,'bar',piedata,option);
            this.cchart=0;
        }
        else{
            console.log('Error occured due to value of cchart: ',this.cchart);
        }
    }
}

var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.type= 'text/javascript';
script.src= 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js';
head.appendChild(script);


x = [25,50,20,30,35,60,10];
x2 = [25,20,20,30,35,30,20];
x3 = [50,30,60,40,30,10,70];
dates = ['jan','feb','mar','april','may','june','july'];
labels =['investor 1','investor 2','investor 3'];
backcolor =['#00688B','#33A1C9','#BFEFFF'];
pdata =[25,25,50];

var chartobj = new chartWidget([x,x2,x3],[labels,backcolor,dates],pdata,'mychart');
document.getElementById("prev").addEventListener("click", ch);
document.getElementById("next").addEventListener("click", ch);
chartobj.cgraph();

function ch(){
    chartobj.cgraph();
}

