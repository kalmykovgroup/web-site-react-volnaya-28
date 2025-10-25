// src/pages/HomePage/HomePage.tsx
import React from 'react';
import {Header} from "@ui/components/Header/Header.tsx";
import {YandexMap} from "@ui/components/YandexMap/YandexMap.tsx";
import {Categories} from "@ui/components/Categories/Categories.tsx";
import {Hero} from "@ui/components/Hero/Hero.tsx";
import {Reviews} from "@ui/components/Reviews/Reviews.tsx";
import {Team} from "@ui/components/Team/Team.tsx";

export const HomePage: React.FC = () => {
     const scrollToCategories = () => {
        const element = document.getElementById('categories');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToAbout = () => {
        const element = document.getElementById('about');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToReviews = () => {
        const element = document.getElementById('reviews');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 50;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToContacts = () => {
        const element = document.getElementById('contacts');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    const scrollToMap = () => {
        const element = document.getElementById('map');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        const element = document.getElementById('home');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };




    return (
        <>
            <Header
                onCatalogClick={scrollToCategories}
                onTopClick={scrollToTop}
                onAboutClick={scrollToAbout}
                onContactsClick={scrollToContacts}
                onReviewsClick={scrollToReviews}
                onMapClick={scrollToMap}
            />

            <Hero onCatalogClick={scrollToCategories} />

            <Categories />

            <Reviews />

            <Team />

            <YandexMap />
        </>


    );
};