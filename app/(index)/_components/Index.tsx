'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Task } from '@prisma/client';
import { LucideEdit, LucidePlus, LucideSave, LucideTrash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
	createTask,
	deleteTask,
	getAllTasks,
	toggleTaskComplete,
	updateTask,
} from '../actions';

const Index = () => {
	const [task, setTask] = useState<string>('');
	const [list, setList] = useState<Task[]>([]);
	const [editId, setEditId] = useState<string | null>(null);
	const [error, setError] = useState('');

	useEffect(() => {
		getAllTasks().then((response) => {
			setList(response);
		});
	}, [task]);

	const addItems = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!task.trim()) {
			setError('Task description is required!');
			return;
		}

		if (editId) {
			updateTask(editId, task.trim());
			setEditId(null);
		} else {
			createTask(task.trim());
		}
		setTask('');
		setError('');
	};

	const deleteItem = (id: string) => {
		setList((prevList) => prevList.filter((item) => item.id !== id));
		deleteTask(id);
	};

	const editItem = (id: string) => {
		const itemToEdit = list.find((item) => item.id === id);
		if (itemToEdit) {
			setTask(itemToEdit.description);
			setEditId(id);
		}
	};

	const toggleComplete = (id: string) => {
		setList((prevList) =>
			prevList.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
		toggleTaskComplete(id);
	};

	return (
		<div className='flex flex-col items-center justify-center p-4'>
			<Card className='w-full sm:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[30%]'>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Todo App</CardTitle>
					<CardDescription>Todo App to test my skills</CardDescription>
					<Separator orientation='horizontal' />
				</CardHeader>

				<CardContent>
					<form onSubmit={addItems}>
						<div className='flex flex-col mb-4 gap-2'>
							<div className='flex w-full items-center space-x-2'>
								<Input
									type='text'
									name='task'
									placeholder='Add a new Task'
									value={task}
									onChange={(e) => {
										setError('');
										setTask(e.target.value);
									}}
								/>
								<Button type='submit'>
									{editId ? <LucideSave /> : <LucidePlus />}
								</Button>
							</div>
							{error && (
								<p className='text-destructive text-xs text-center'>{error}</p>
							)}
						</div>
					</form>

					<div className='flex flex-col items-start gap-3 w-full'>
						{list.map((item) => (
							<div
								key={item.id}
								className='flex items-center justify-between w-full rounded-lg gap-2'
							>
								<div className='flex items-center gap-2'>
									<Checkbox
										id={item.id}
										checked={item.completed}
										onCheckedChange={() => toggleComplete(item.id)}
									/>
									<Label
										htmlFor={item.id}
										className={`text-sm ${
											item.completed ? 'line-through' : ''
										}`}
									>
										{item.description}
									</Label>
								</div>

								<div className='flex gap-2'>
									<Button size='icon' onClick={() => editItem(item.id)}>
										<LucideEdit />
									</Button>

									<Button
										size='icon'
										variant='destructive'
										onClick={() => deleteItem(item.id)}
									>
										<LucideTrash2 />
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Index;
