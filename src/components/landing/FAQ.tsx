"use client"

import { BiMinus, BiPlus } from "react-icons/bi";
import {siteDetails} from "@/data/siteDetails";
import SectionTitle from "./SectionTitle";
import { faqs } from "@/data/faq";
import { Disclosure } from "@headlessui/react";

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="">
                    <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">Frequently Asked Questions</h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        Ask us anything!
                    </p>
                    <a href="mailto:" className="mt-3 block text-xl lg:text-4xl text-blue-500 font-semibold hover:underline text-center lg:text-left">{siteDetails.siteUrl}</a>
                </div>

                <div className="w-full lg:max-w-2xl mx-auto border-b">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-7">
                            <Disclosure>
                                {({ open }) => (
                                    
                                        <div>
                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                                            <span className="text-2xl font-semibold">{faq.question}</span>
                                            {open ? <BiMinus className="w-5 h-5 text-blue-500" /> : <BiPlus className="w-5 h-5 text-blue-500" />}
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-foreground-accent">
                                            {faq.answer}
                                        </Disclosure.Panel>
                                        </div>
                                    
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;