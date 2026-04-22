const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@agenda.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@agenda.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@agenda.com' },
    update: {},
    create: {
      name: 'Usuário Teste',
      email: 'user@agenda.com',
      password: userPassword,
      role: 'USER',
    },
  });

  const services = [
    {
      title: 'Orientação acadêmica',
      description: 'Atendimento individual para tirar dúvidas acadêmicas.',
      duration: 30,
    },
    {
      title: 'Suporte de TI',
      description: 'Ajuda com problemas técnicos e acesso a sistemas.',
      duration: 45,
    },
    {
      title: 'Mentoria de projeto',
      description: 'Sessão para revisão e acompanhamento de projetos.',
      duration: 60,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: services.indexOf(service) + 1 },
      update: service,
      create: service,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
