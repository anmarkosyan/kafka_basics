import {Kafka} from "kafkajs";

async function run(){
    try{
        const kafka = new Kafka({
            clientId: "myapp",
            ssl:true,
            brokers: [":9092"]
        });

        const admin = kafka.admin();
        console.log('connecting...');
        await admin.connect();
        console.log('connected)))))))');

        await admin.createTopics({
            // A-M, N-Z
            topics:[{
                topic: 'Users',
                numPartitions: 2
            }]
        });

        console.log('Created topic successfully!!!!');
        await admin.disconnect();

    }catch (e){
        console.error(e);
    }finally {
        process.exit(0);
    }
}
run();
