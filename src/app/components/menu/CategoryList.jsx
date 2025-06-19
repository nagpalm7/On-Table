'use client'
import React, { useEffect, useRef, useState } from 'react'

const CategoryList = ({ menu }) => {
    const [activeCategory, setActiveCategory] = useState(menu[0]?.name || '')
    const observerRef = useRef(null)
    const buttonsRef = useRef({})
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px 0px -60% 0px',
            threshold: 0.1,
        }

        const callback = (entries) => {
            // Get all intersecting entries and sort them top-to-bottom
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visibleEntries.length > 0) {
                // Always pick the topmost intersecting section
                const topEntry = visibleEntries[0];
                
                setActiveCategory(topEntry.target.id);
            }
        };


        observerRef.current = new IntersectionObserver(callback, options)

        menu.forEach((category) => {
            const el = document.getElementById(category.name)
            if (el) observerRef.current.observe(el)
        })

        return () => {
            observerRef.current.disconnect()
        }
    }, [menu])


    // Auto-scroll active tab into view
    useEffect(() => {
        const activeBtn = buttonsRef.current[activeCategory]
        const scrollContainer = scrollContainerRef.current
        if (activeBtn && scrollContainer) {
            const btnOffset = activeBtn.offsetLeft
            const btnWidth = activeBtn.offsetWidth
            const containerWidth = scrollContainer.offsetWidth
            const scrollPos = btnOffset - containerWidth / 2 + btnWidth / 2
            scrollContainer.scrollTo({
                left: scrollPos,
                behavior: 'smooth',
            })
        }
    }, [activeCategory])

    return (
        <div className="sticky top-0 z-10 bg-base-100">
            <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-4 scroll-smooth touch-auto snap-x"
            >
                {menu.map((category) => (
                    <button
                        key={category.name}
                        ref={(el) => (buttonsRef.current[category.name] = el)}
                        className={`btn btn-sm rounded-full min-w-fit shadow-md whitespace-nowrap snap-start ${activeCategory === category.name
                            ? 'btn-success btn-soft shadow-sm'
                            : 'bg-gray-100 text-black'
                            }`}
                        onClick={() => {
                            const element = document.getElementById(category.name)
                            if (element) {
                                const yOffset = -60 // adjust to match header height
                                const y =
                                    element.getBoundingClientRect().top + window.pageYOffset + yOffset
                                window.scrollTo({ top: y, behavior: 'smooth' })
                            }
                        }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
