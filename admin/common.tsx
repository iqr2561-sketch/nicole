
import React from 'react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AdminInput: React.FC<AdminInputProps> = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-400 mb-2 text-sm">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
    />
  </div>
);

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const AdminTextarea: React.FC<AdminTextareaProps> = ({ label, ...props }) => (
    <div>
      <label className="block text-gray-400 mb-2 text-sm">{label}</label>
      <textarea
        {...props}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
      />
    </div>
);


interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const AdminButton: React.FC<AdminButtonProps> = ({ children, ...props }) => (
    <button
        {...props}
        className="px-6 py-2 bg-brand-green text-black font-bold rounded-md hover:bg-green-400 transition-colors disabled:bg-gray-500"
    >
        {children}
    </button>
);
