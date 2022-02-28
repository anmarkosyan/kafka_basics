import {Kafka} from "kafkajs";

const run = async function(){
    try{
        const kafka = new Kafka({
            clientId: "myapp",
            ssl:true,
            brokers: ["anush:9092"]
        });

        const consumer = kafka.consumer({
            groupId: 'test',
        });
        await consumer.connect();

        await consumer.subscribe({
            topic: 'Users',
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(`Msg ${result.message.value} on partition ${result.partition}`)
            }
        })
    }catch (e){
        console.error(e);
    }finally {
        process.exit(0);
    }
}
run();