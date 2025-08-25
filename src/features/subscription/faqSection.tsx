import { Accordion, Box, Text } from "@chakra-ui/react";
import { FaqAccordion } from "../components/faqAccordion";

export function FAQ() {
  return (
    <Box bg="black" py={20} px={{ base: 5, md: 20 }}>
      <Text
        color="white"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={4}
      >
        Tanya Jawab Umum
      </Text>
      <Accordion allowToggle>
        <FaqAccordion
          question="Apa itu Alflix?"
          answer="Alflix adalah layanan streaming yang menawarkan berbagai acara TV pemenang penghargaan, film, anime, dokumenter, dan banyak lagi di ribuan perangkat yang terhubung ke Internet."
        />
        <FaqAccordion
          question="Berapa biaya berlangganan Alflix?"
          answer="Tonton Alflix di smartphone, tablet, Smart TV, laptop, atau perangkat streaming-mu, semuanya dengan satu harga bulanan tetap Rentang harga mulai dari Rp54.000 hingga Rp186.000 per bulan. Tanpa biaya ekstra, tanpa kontrak."
        />
        <FaqAccordion
          question="Dimana saya bisa menonton Alflix?"
          answer="Tonton di mana pun, kapan pun. Masuk ke akun Alflix-mu untuk menonton langsung di alflix.com dari komputer pribadi atau di perangkat yang terhubung ke Internet mu, smartphone, dan tablet"
        />
      </Accordion>
    </Box>
  );
}
