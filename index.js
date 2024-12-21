import express from 'express';
import ZSecure  from 'z-secure-service';
import ip from "@arcjet/ip";

const rate = ZSecure({
    API_KEY: "st_DbXkICEOt6pgvIbuw-qThu4a__9u7nE7",
    baseUrl: "http://localhost:3000",
    
    rateLimitingRule : {
        algorithm : "FixedWindowRule",
        rule : {
            limit: 5,
            windowMs :  60000,
            
        }
    },
    // shieldRule: {
    //     mode: "LIVE",
    //     limit: 5,
    //     threshold: 5,
    //     windowMs: 60000
    //   }
});






const app = express();

app.use(express.json());

// app.use(bucket)
// app.use(bucket);
const port = 3001;

app.get('/', async (req, res) => {
    const userIp = ip(req);
    console.log("Detected IP Address:", userIp);
    const result = await rate.protect(req,1 );
    console.log(result);
    if(!result.isdenied){
        res.send('Hello, World!');
    }
    else{
        res.send(result.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});