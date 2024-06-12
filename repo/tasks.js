import prisma from "@/repo/prisma";

export async function getTasks() {
  return await prisma.task.findMany();
}
export async function addTask(title) {
  return await prisma.task.create({
    data: {
      title,
      completed: false,
    },
  });
}
export async function removeTask(id) {
  if (!id) {
    return await prisma.task.deleteMany({
      where: {
        completed: true,
      },
    });
  }
  return await prisma.task.delete({
    where: {
      id,
    },
  });
}

export async function updateTask(id, completed) {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });
}
