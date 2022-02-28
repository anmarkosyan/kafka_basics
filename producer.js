import {Kafka} from "kafkajs";


const msg = process.argv[2];

const run = async function(){
    try{
        const kafka = new Kafka({
            clientId: "myapp",
            ssl:true,
            brokers: ["anush:9092"]
        });

        const producer = kafka.producer();
        await producer.connect();

        //A-M => 0 index of partition, N-Z 1 index
        const partition = msg[0].toUpperCase() < 'N' ? 0 : 1;
        await producer.send({
            topic: 'Users',
            messages: [{
                value: msg,
                partition: partition,
            }]
        });

        console.log('Send successfully)))');

        await producer.disconnect();

    }catch (e){
        console.error(e);
    }finally {
        process.exit(0);
    }
}
run();