import React from 'react'
import { Button } from '../../components/ui/button'
import { UserPlus, Clock, LogOut } from 'lucide-react'
import { NavLink } from 'react-router'
import RegisterNewUser from '../../components/register/register'
import ClockIn from '../../components/clockIn/clock-in'
import ClockOut from '../../components/clockOut/clock-out'

type ButtonProps = {
    title: string
    icon: React.ReactNode
    onClick?: () => void
    href?: string
}

const Home: React.FC = () => {

    const buttons: ButtonProps[] = [
        {
            title: 'Register New User',
            icon: <UserPlus className="mr-2" />,
            href: '/register',
            onClick: () => <RegisterNewUser /> // This will be handled by the NavLink
        },
        {
            title: 'Clock In',
            icon: <Clock className="mr-2" />,
            onClick: () => <ClockIn />, // This will be handled by the NavLink
            href: '/clock-in'
        },
        {
            title: 'Clock Out',
            icon: <LogOut className="mr-2" />,
            onClick: () => <ClockOut />, // This will be handled by the NavLink
            href: '/clock-out'
        }
    ]

    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
            <div className=' bg-[#fff] rounded-lg shadow-lg px-6 py-6 pb-10 h-[500px] w-fit flex flex-col items-center'>
                <span className='flex items-center'>
                    <h1 className='text-2xl font-bold text-green-600 text-center'>Welcome to Kendesoft Receptionist</h1>
                </span>
                <div className='mt-20 flex flex-col items-center justify-center gap-4 w-fit'>
                    {buttons.map((button, index) => (
                        <NavLink to={button.href || '#'} key={index} className='w-full'>
                            <Button
                                onClick={button.onClick}
                                className={`w-[200px] ${button.title === 'Clock In' ? 'bg-green-500' : button.title === 'Clock Out' ? 'bg-red-500' : button.title === 'Register New User' ? 'bg-blue-500' : ''} text-white flex items-center justify-evenly`}
                            >
                                {button.title}
                                {button.icon}
                            </Button>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home