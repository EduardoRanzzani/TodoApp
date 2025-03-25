'use server';
import prisma from '@/lib/db';

export async function getAllTasks() {
	const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
	console.log({ tasks });
	return tasks;
}

export async function createTask(description: string) {
	if (!description) {
		throw new Error('Task description is required!');
	}

	const descriptionExists = await prisma.task.findFirst({
		where: {
			description,
		},
	});
	if (descriptionExists) {
		throw new Error('Task description already exists');
	}

	const task = await prisma.task.create({
		data: {
			description,
			completed: false,
		},
	});

	console.log({ task });
}

export async function updateTask(id: string, description: string) {
	if (!description) {
		throw new Error('Task description is required!');
	}

	const task = await prisma.task.update({
		where: {
			id,
		},
		data: {
			description,
			completed: false,
		},
	});

	console.log({ task });
}

export async function toggleTaskComplete(id: string) {
	const taskData = await prisma.task.findFirst({ where: { id } });

	const task = await prisma.task.update({
		where: {
			id,
		},
		data: {
			completed: taskData?.completed ? false : true,
		},
	});

	console.log({ task });
}

export async function deleteTask(id: string) {
	const task = await prisma.task.delete({
		where: {
			id,
		},
	});

	console.log({ task });
}
