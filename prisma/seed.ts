import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma: PrismaClient = new PrismaClient();

const main = async () => {
    const users = [];
    for (let i = 0; i < 100; i++) {
        users.push({
            username: faker.internet.userName(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: faker.internet.avatar(),
        });
    }

    prisma.user.createMany({ data: users });
}

(async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
})();