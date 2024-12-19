import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import background from "../../assets/images/bg_1.avif";
import foreground from "../../assets/images/8369140.png";
import "../../assets/Css/HeroSection.css";

const HeroSection = () => {
  const [props, set] = useSpring(() => ({
    backgroundScale: 2,
    foregroundScale: 1.5,
    config: { tension: 280, friction: 60 },
  }));

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const wrapper = document.querySelector(".wrapper");
          const scrollTop = wrapper.scrollTop;
          const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
          const scrollFraction = scrollTop / maxScroll;

          set({
            backgroundScale: 2 + scrollFraction,
            foregroundScale: 1.5 + scrollFraction * 0.5,
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    const wrapper = document.querySelector(".wrapper");
    wrapper.addEventListener("scroll", handleScroll);

    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
    };
  }, [set]);

  return (
    <>
      <div className="wrapper">
        <header>
          <animated.img
            src={background}
            alt=""
            className="background"
            style={{ transform: props.backgroundScale.to(scale => `translate(-50%, -50%) translateZ(-10px) scale(${scale})`) }}
          />
          <animated.img
            src={foreground}
            alt=""
            className="foreground"
            style={{ transform: props.foregroundScale.to(scale => `translate(-50%, -50%) translateZ(-5px) scale(${scale})`) }}
          />
          <h1 className="title">Welcome Hurry and Happy</h1>
        </header>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi
        delectus consectetur quo odio aliquam nam similique illum. Placeat iste
        asperiores libero dolor autem voluptatibus temporibus aliquam, et minus
        minima, nihil beatae, reiciendis est quisquam laudantium eaque. Quod
        deserunt veniam itaque ratione consequuntur saepe quisquam sapiente sint
        amet repellendus quam exercitationem voluptate consequatur eveniet nihil
        maiores aliquid deleniti veritatis alias non accusantium, dolor placeat
        dolore! Excepturi debitis corrupti, non quidem iure fuga necessitatibus
        a esse voluptas quisquam hic asperiores quas dicta ab itaque
        consequuntur. Consequatur facere ad hic quas quod dignissimos totam,
        repellat, ipsum sapiente provident ut officia pariatur cum! Quo cumque
        vel voluptates optio officia, porro ut magni dolorem velit fugiat. Rerum
        dolor aliquam, soluta nobis odio eum animi maiores harum? Quia porro
        laboriosam cupiditate minus possimus voluptate deserunt aliquam
        accusantium temporibus esse dolores, ipsa reprehenderit natus delectus
        nemo doloribus magni soluta iste quasi illum et impedit numquam
        asperiores. Aspernatur, ea molestiae? Iusto tempore, facere soluta saepe
        consectetur laboriosam est aut eos pariatur numquam velit odio expedita
        nesciunt perferendis obcaecati, iste corrupti doloribus nemo amet.
        Distinctio inventore quaerat qui laboriosam illo pariatur illum, earum
        sint, magnam facere sapiente? Obcaecati maiores possimus nostrum et
        recusandae cum consequuntur facilis, cumque corporis asperiores. Sunt,
        officiis ab. A voluptates ratione cum, tempora dicta amet id
        necessitatibus obcaecati natus similique voluptatum, voluptate quod nisi
        quas eveniet eaque? Ipsam molestias optio tempore sunt maxime ullam
        architecto, impedit esse, vero similiqu e deleniti temporibus fuga aut
        nemo tempora dignissimos hic! Expedita laudantium dolore alias nam
        veniam ipsum voluptas magni quod sapiente porro velit tempora ducimus
        hic dolor maiores incidunt quis laboriosam, quasi doloremque, dolores
        enim voluptate molestiae fugit? Aliquam temporibus nobis, itaque
        pariatur consequuntur eveniet repellendus veniam, provident harum eius
        atque porro velit, facere dignissimos odit rem! Voluptatem illum
        voluptas nesciunt? Ipsam laboriosam eaque inventore quae mollitia
        veritatis odio incidunt, quod autem neque dolorem repellat deserunt
        quaerat sunt minus. Ut repellendus, velit explicabo, nulla dolore
        assumenda earum iusto corporis aut molestias beatae asperiores maxime.
        Quae dolorum ullam architecto sunt consequuntur, hic excepturi animi
        placeat omnis et! Dolorem dignissimos tempora sint atque illum, eius
        animi, corporis harum obcaecati, repudiandae fuga alias perferendis
        numquam. Qui ratione excepturi quas unde deserunt, officia eaque tempore
        voluptatibus cumque, esse quos quo obcaecati mollitia ipsam alias
        accusamus. Porro ad eum ut aut accusantium, debitis, quas modi iusto eos
        tempora unde fuga! Repellat debitis vitae ullam aspernatur deserunt
        sequi, ipsam deleniti eius nulla at exercitationem. Mollitia excepturi
        commodi neque pariatur qui assumenda eum, atque molestiae! Beatae error
        quia consequatur ullam nihil numquam distinctio tempore, quo autem
        cumque voluptates placeat saepe, adipisci ipsum provident, dolorum
        quidem architecto assumenda! Nam unde, est doloremque perferendis sequi,
        a excepturi possimus ratione rem tenetur nihil error ea alias odit
        architecto nostrum. Fuga, autem? Neque sit rerum laudantium autem quo ex
        eveniet reiciendis. Minima totam laudantium porro, odio aspernatur
        voluptas inventore sequi, nulla rem adipisci voluptates recusandae quod
        doloremque autem laboriosam facere voluptatum, ea blanditiis. Quasi
        assumenda unde sequi facere quia libero, rerum possimus vel corporis
        aspernatur quod. Commodi?
      </p>
    </>
  );
};

export default HeroSection;
